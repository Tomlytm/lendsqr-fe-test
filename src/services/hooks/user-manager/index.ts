import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiRoutes } from "../../api/api-routes.ts";
import api from "../../api/index.ts";
import { User } from "../../../types/user.ts";

interface Stats {
    totalUsers: number;
    activeUsers: number;
    loanUsers: number;
    savingsUsers: number;
}



const useGetUsers = () => {
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<User[]> = useQuery({
    queryKey: ["getUsers"],
    queryFn: async (): Promise<User[]> => {
      const url = `${apiRoutes.users.getUsers}`;
      return await api.get<User[]>({ url, auth: true });
    },
  });

  return { 
    usersData, 
    loadingUsers: isLoading, 
    usersError: isError, 
    refetch 
  };
};

const useGetStats = () => {
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<Stats> = useQuery({
    queryKey: ["getUserStats"],
    queryFn: async (): Promise<Stats> => {
      const url = `${apiRoutes.users.getStats}`;
     const response = await api.get<Stats>({ url, auth: true });
     return response
    },
  });

  return { 
    stats, 
    loadingStats: isLoading, 
    statsError: isError, 
    refetch 
  };
};

export { useGetUsers, useGetStats };
