export interface DoctorReviewQuery {
  page?: number;
  limit?: number;
  doctorId?: string;
  userId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultDoctorReviewQuery: DoctorReviewQuery = {
  page: 1,
  limit: 100,
};
