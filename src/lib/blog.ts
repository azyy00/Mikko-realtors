export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  coverSeed: string;
  coverImage?: string;
  source?: { platform: "facebook"; url: string; isVideo: boolean; videoUrl?: string };
  youTubeId?: string;
  localVideo?: string;
  body: string[];
  cta: string;
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
