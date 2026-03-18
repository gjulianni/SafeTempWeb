import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { ComparisonResponse } from '../types/comparison'; 
import type { HistoryPoint } from '../pages/comparison/ComparisonPage';

interface UseComparisonParams {
  rangeA: string;
  rangeB: string;
  granularity?: string;
};

type ComparisonHookResult = ComparisonResponse & {
  seriesA: HistoryPoint[];
  seriesB: HistoryPoint[];
};

export function useComparison({ rangeA, rangeB, granularity = '10m' }: UseComparisonParams) {
  return useQuery<ComparisonHookResult>({
    queryKey: ['use-comparison', rangeA, rangeB, granularity],
    queryFn: async () => {
      const [comparisonRes, historyARes, historyBRes] = await Promise.all([
        api.post('comparison/compare', { rangeA, rangeB }),
        api.get('data/history', { params: { date: rangeA, granularity } }),
        api.get('data/history', { params: { date: rangeB, granularity } })
      ]);

      return {
        ...comparisonRes.data, 
        seriesA: historyARes.data.records,
        seriesB: historyBRes.data.records
      };
    },
    enabled: !!rangeA && !!rangeB 
  });
}