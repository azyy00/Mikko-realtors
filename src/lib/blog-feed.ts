import "server-only";
import { getFacebookPost, getFacebookPosts } from "./facebook";

export async function getBlogPosts() {
  return getFacebookPosts();
}

export async function getBlogPost(slug: string) {
  return getFacebookPost(slug);
}
