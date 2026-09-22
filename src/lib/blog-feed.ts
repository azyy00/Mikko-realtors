import "server-only";
import { blogPosts, getPost } from "./blog";
import { getFacebookPost, getFacebookPosts } from "./facebook";

export async function getBlogPosts() {
  const facebook = await getFacebookPosts();
  return [...facebook, ...blogPosts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getBlogPost(slug: string) {
  return getPost(slug) || await getFacebookPost(slug);
}
