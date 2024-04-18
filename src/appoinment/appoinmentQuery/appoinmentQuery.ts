export interface AppoinmentQuery {
  packageId?: string;
  planId?: string;
  userId?: string;
  doctorId?: string;
  type?: string;
  packageExpired?: string;
  status?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultAppoinmentQuery: AppoinmentQuery = {
  page: 1,
  limit: 100,
};
