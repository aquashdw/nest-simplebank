export class OrderPlacedEvent {
  requestId: string;
  accountId: number;
  shareId: number;
  sellCount: number;
  status: string;
  message: string;
}
