export interface LastDataResponse {
  lastRecord: {
    id: number;
    chipId: string;
    value: number;
    timestamp: string;
  };
}