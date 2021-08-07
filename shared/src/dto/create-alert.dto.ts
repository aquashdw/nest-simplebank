export interface CreateAlertDto {
  message: string;
  targetAccountIds: number[];
  sendTime: string;
}
