export interface SystemLog {
    id: number;
    chipId: string;
    level: 'INFO' | 'WARN' | 'ERROR';
    message: string;
    timestamp: string;
}