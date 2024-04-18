export class PackageQuery {
  duration?: number;
  planId?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultPackageQuery: PackageQuery = {
  page: 1,
  limit: 100,
};
