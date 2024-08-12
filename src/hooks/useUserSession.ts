import { useQuery } from 'react-query';
import { getUserSession } from "../services/AuthService";

export const useUserSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getUserSession,
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
};
