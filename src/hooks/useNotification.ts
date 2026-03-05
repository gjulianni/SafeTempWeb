import api from '../services/api';
import type { Notification } from '../utils/types/notification';

export const getNotifications = () => api.get<Notification[]>('notifications/list');
export const markNotificationsAsRead = () => api.patch('notifications/read');