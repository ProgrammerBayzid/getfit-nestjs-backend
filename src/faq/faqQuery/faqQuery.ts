export interface FaqQuery {
  category?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultFaqQuery: FaqQuery = {
  page: 1,
  limit: 100,
};
