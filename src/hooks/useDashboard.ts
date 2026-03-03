import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { DashboardData } from '../types/dashboardData';
import type { TemperatureHistoryResponse } from '../types';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [lastRes, historyRes] = await Promise.all([
        api.get('/data/lastdata'),
        api.get('/data/history1h')
      ]);

      return {
        lastRecord: lastRes.data.lastRecord,
        statistics: historyRes.data.statistics
      } as DashboardData;
    },
    refetchInterval: 60000, 
  });
};

export function useHistory() {
  return useQuery({
    queryKey: ['use-history'],
    queryFn: async () => {
      try {
        const [lastRes, historyRes] = await Promise.all([
          api.get('data/lastdata'),
          api.get('data/history1h')
        ]);

        console.log("Dados LastData:", lastRes.data);
        console.log("Dados History:", historyRes.data);

        return {
          records: historyRes.data.records || [], 
          statistics: historyRes.data.statistics
        } as TemperatureHistoryResponse;
      } catch (err) {
        console.error("Erro na requisição do Dashboard:", err);
        throw err;
      }
    },
    refetchInterval: 60000, 
  });
};