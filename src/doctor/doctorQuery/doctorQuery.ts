export interface DoctorQuery {
  online?: boolean;
  verified?: boolean;
  reject?: boolean;
  gender?: string;
  averageRating?: number;
  totalRating?: number;
  speciality?: string[];
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
const defaultDoctorQuery: DoctorQuery = {
  page: 1,
  limit: 100,
  verified: true,
};
