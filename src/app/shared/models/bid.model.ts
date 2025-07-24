export interface Bid {
  id: string;
  jobId: string;
  artisanId: string;
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}
export interface BidWithDetails extends Bid {
  jobTitle: string;
  artisanName: string;
  artisanAvatarUrl?: string;
}