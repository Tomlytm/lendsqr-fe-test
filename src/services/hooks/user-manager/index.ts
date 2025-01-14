import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiRoutes } from "../../api/api-routes.ts";
import api from "../../api/index.ts";

interface User {
  id: number;
  personalInformation: {
    fullName: string;
    phoneNumber: string;
    email: string;
    username: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  organization: string,
  dateJoined: string,
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  secondGuarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  accountDetails: {
    accountNumber: string;
    bankName: string;
    balance: string;
  };
  tier: number;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}



const useGetUsers = (companyId: string) => {
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<User[]> = useQuery({
    queryKey: ["getUsers", companyId],
    queryFn: async (): Promise<User[]> => {
      const url = `${apiRoutes.users.getUsers(companyId)}`;
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

export { useGetUsers };
