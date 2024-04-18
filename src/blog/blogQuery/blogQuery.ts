export class BlogQuery {
  category?: string;
  planId?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultBlogQuery: BlogQuery = {
  page: 1,
  limit: 100,
};
