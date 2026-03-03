import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

const getMe = async () => {
  const response = await api.get('user/me');
  return response.data;
};

export function useGetMe() {
    return useQuery({
        queryKey: ['get-me'],
        queryFn: getMe,
        retry: false, 
    staleTime: 1000 * 60 * 10, 
    gcTime: 1000 * 60 * 30, 
  });
}
