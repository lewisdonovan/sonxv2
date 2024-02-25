import { getServerSession } from "next-auth/next"
import { 
  doc, 
  getDocs, 
  setDoc, 
  query, 
  where
} from 'firebase/firestore';
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { postsCol } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { randomUUID } from "crypto";
import { Timestamp, WithFieldValue } from "firebase-admin/firestore";
import { Post } from "@/types";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean().optional()
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session;
    const posts = await query(postsCol, where(
      "authorId", "==", user.id
    )) ?? [];

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.post.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const id = randomUUID();
    const postRef = doc(postsCol, id);

    const now = new Date();

    const post = {
      id: id ?? "",
      title: body.title ?? "",
      content: body.content ?? undefined,
      published: body.published ?? false,
      createdAt: now,
      updatedAt: now,
      authorId: session.user.id,
    } as WithFieldValue<Post>

    await setDoc(postRef, post);

    return new Response(JSON.stringify(post))
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    // if (error instanceof RequiresProPlanError) {
    //   return new Response("Requires Pro Plan", { status: 402 })
    // }

    return new Response(null, { status: 500 })
  }
}
