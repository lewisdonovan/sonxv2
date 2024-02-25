import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"
import { OutputBlockData } from "@editorjs/editorjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function encodeBlocksForFirestore(blocks: OutputBlockData[]) {
  if (!blocks || !blocks.length) return blocks;
  return blocks.map(block => {
    if (!block || block.type !== "table") return block;
    const newContent = Object.fromEntries(block.data.content);
    block.data.content = newContent
    return block;
  });
}

export function decodeBlocksFromFirestore(blocks: OutputBlockData[]) {
  if (!blocks || !blocks.length) return blocks;
  return blocks.map(block => {
    if (!block || block.type !== "table") return block;
    const newContent = Object.keys(block.data.content).map(k => {
      return [
        k, 
        block.data.content[k]
      ]
    });
    block.data.content = newContent
    return block;
  })
}