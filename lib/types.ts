export type Tool = {
  id: number;
  name: string;
  slug: string;
  category: string;
  website: string | null;
  integration_status: string;
  opportunity_score: number;
  momentum: string;
  notes: string | null;
};
