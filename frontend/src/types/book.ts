export type SentimentBreakdown = {
  positive: number;
  neutral: number;
  negative: number;
};

export type AspectScores = {
  story: number;
  writingStyle: number;
  readability: number;
  usefulness: number;
};

export type ReviewInsight = {
  dataStatus: "MOCK" | "VERIFIED";
  reviewCount: number;
  sentiment: SentimentBreakdown;
  summary: string;
  strengths: string[];
  cautions: string[];
  keywords: string[];
  aspects: AspectScores;
  recommendedFor: string[];
};

export type CoverTheme =
  | "forest"
  | "sunset"
  | "midnight"
  | "ocean"
  | "clay"
  | "lavender";

export type Book = {
  id: number;
  isbn13: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  publishedDate: string;
  category: string;
  rating: number;
  rank?: number;
  coverTheme: CoverTheme;
  description: string;
  insight: ReviewInsight;
};
