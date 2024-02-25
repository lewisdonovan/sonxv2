import { getServerSession } from "next-auth"
import * as z from "zod"
import { 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  and
} from 'firebase/firestore';
import sanitizer from "sanitize";

import { authOptions } from "@/lib/auth"
import { postsCol } from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"
import { encodeBlocksForFirestore } from "@/lib/utils";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    const hasAccess = await verifyCurrentUserHasAccessToPost(params.postId)
    if (!(hasAccess)) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    const res = await deleteDoc(doc(postsCol, params.postId));

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    const hasAccess = await verifyCurrentUserHasAccessToPost(params.postId)
    if (!(hasAccess)) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json();

    if (json.content.blocks && json.content.blocks.length) {
      const fixedBlocks = encodeBlocksForFirestore(json.content.blocks);
      json.content.blocks = fixedBlocks;
    }

    const body = postPatchSchema.parse(json)

    const postRef = doc(postsCol, params.postId);
    await updateDoc(postRef, {
      // title: sanitizer.value(body.title, "string"),
      title: body.title,
      content: body.content, // TODO: Implement sanitization
      updatedAt: new Date(), 
      published: true,
    });

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  try {
    const session = await getServerSession(authOptions)
    const snapshot = await getDocs(query(
      postsCol, 
      where(
        "authorId", "==", session?.user.id
      ), where(
        "id", "==", postId
      )
    )) ?? [];

    return snapshot.docs.length > 0
  } catch (error) {
    console.log(error);
    return false;
  }
}
