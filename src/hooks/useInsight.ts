import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import type { GreenhouseContext } from '../types/insightContext';

export const useGenerateInsight = () => {

  return useMutation({
    mutationFn: async (payload: GreenhouseContext) => {
      const { data } = await api.post(
        `insights/quick-insight`, 
        payload, 
        { withCredentials: true }
      );
      
      return data; 
    },
  });
};