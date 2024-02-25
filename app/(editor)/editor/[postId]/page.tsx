import { notFound, redirect } from "next/navigation"
import { doc, getDoc, query, where } from "firebase/firestore";

import { Post, User } from "@/types";
import { authOptions } from "@/lib/auth"
import { postsCol } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"
import { decodeBlocksFromFirestore, encodeBlocksForFirestore } from "@/lib/utils";

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  try {
    const docRef = doc(postsCol, postId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Not found")
    }
    const post = docSnap.data();
    if (!post.authorId || post.authorId !== userId) {
      throw new Error("Not allowed")
    }
    return post;
  } catch (error) {
    console.error(error);
    return false;
  }
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
  }

  if (post.content && post.content.blocks.length) {
    const fixedBlocks = decodeBlocksFromFirestore(post.content.blocks);
    post.content.blocks = fixedBlocks
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published, 
        authorId: post.authorId
      }}
    />
  )
}
