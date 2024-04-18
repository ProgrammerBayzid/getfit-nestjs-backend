export class ContactUsQuery {
  userId?: string;
  doctorId?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
