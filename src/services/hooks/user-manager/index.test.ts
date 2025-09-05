import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUsers, useGetStats } from './index';
import api from '../../api';
import { User } from '../../../types/user';

// Mock the API
jest.mock('../../api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    personalInformation: {
      fullName: 'John Doe',
      phoneNumber: '1234567890',
      email: 'john@example.com',
      username: 'johndoe',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: 'Parent\'s Apartment'
    },
    organization: 'Lendsqr',
    dateJoined: '2023-01-15',
    educationAndEmployment: {
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'john@lendsqr.com',
      monthlyIncome: ['200,000', '400,000'],
      loanRepayment: '40,000'
    },
    socials: {
      twitter: '@johndoe',
      facebook: 'john.doe',
      instagram: '@john_doe'
    },
    guarantor: {
      fullName: 'Jane Doe',
      phoneNumber: '0987654321',
      email: 'jane@example.com',
      relationship: 'Sister'
    },
    secondGuarantor: {
      fullName: 'Bob Smith',
      phoneNumber: '1122334455',
      email: 'bob@example.com',
      relationship: 'Friend'
    },
    accountDetails: {
      accountNumber: '1234567890',
      bankName: 'GTBank',
      balance: '500,000'
    },
    tier: 1,
    status: 'Active'
  },
  {
    id: 2,
    personalInformation: {
      fullName: 'Jane Smith',
      phoneNumber: '0987654321',
      email: 'jane@example.com',
      username: 'janesmith',
      gender: 'Female',
      maritalStatus: 'Married',
      children: '2',
      typeOfResidence: 'Own Apartment'
    },
    organization: 'Irorun',
    dateJoined: '2023-02-20',
    educationAndEmployment: {
      levelOfEducation: 'M.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'Technology',
      durationOfEmployment: '3 years',
      officeEmail: 'jane@irorun.com',
      monthlyIncome: ['300,000', '500,000'],
      loanRepayment: '50,000'
    },
    socials: {
      twitter: '@janesmith',
      facebook: 'jane.smith',
      instagram: '@jane_smith'
    },
    guarantor: {
      fullName: 'John Smith',
      phoneNumber: '1234567890',
      email: 'johnsmith@example.com',
      relationship: 'Husband'
    },
    secondGuarantor: {
      fullName: 'Mary Johnson',
      phoneNumber: '2233445566',
      email: 'mary@example.com',
      relationship: 'Friend'
    },
    accountDetails: {
      accountNumber: '0987654321',
      bankName: 'First Bank',
      balance: '750,000'
    },
    tier: 2,
    status: 'Pending'
  }
];

const mockStats = {
  totalUsers: 2500,
  activeUsers: 2453,
  loanUsers: 12453,
  savingsUsers: 102453
};

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
};

describe('User Manager Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useGetUsers Hook', () => {
    describe('Positive scenarios', () => {
      it('should fetch users successfully', async () => {
        mockedApi.get.mockResolvedValueOnce(mockUsers);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        // Initially loading
        expect(result.current.loadingUsers).toBe(true);
        expect(result.current.usersData).toBeUndefined();
        expect(result.current.usersError).toBe(false);

        // Wait for the query to complete
        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(result.current.usersData).toEqual(mockUsers);
        expect(result.current.usersError).toBe(false);
        expect(mockedApi.get).toHaveBeenCalledWith({
          url: expect.stringContaining('/92e3-120e-4f41-9f45'),
          auth: true,
        });
      });

      it('should return users with correct structure', async () => {
        mockedApi.get.mockResolvedValueOnce(mockUsers);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        const users = result.current.usersData;
        expect(users).toHaveLength(2);
        expect(users?.[0]).toHaveProperty('id');
        expect(users?.[0]).toHaveProperty('personalInformation');
        expect(users?.[0]).toHaveProperty('organization');
        expect(users?.[0]).toHaveProperty('status');
        expect(users?.[0].personalInformation).toHaveProperty('email');
        expect(users?.[0].personalInformation).toHaveProperty('username');
      });

      it('should provide refetch function', async () => {
        mockedApi.get.mockResolvedValueOnce(mockUsers);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(typeof result.current.refetch).toBe('function');
      });
    });

    describe('Negative scenarios', () => {
      it('should handle API errors gracefully', async () => {
        const apiError = new Error('Failed to fetch users');
        mockedApi.get.mockRejectedValueOnce(apiError);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(result.current.usersError).toBe(true);
        expect(result.current.usersData).toBeUndefined();
      });

      it('should handle empty response', async () => {
        mockedApi.get.mockResolvedValueOnce([]);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(result.current.usersData).toEqual([]);
        expect(result.current.usersError).toBe(false);
      });

      it('should handle network timeout', async () => {
        const timeoutError = new Error('Network timeout');
        mockedApi.get.mockRejectedValueOnce(timeoutError);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(result.current.usersError).toBe(true);
        expect(result.current.usersData).toBeUndefined();
      });

      it('should handle malformed response data', async () => {
        const malformedData = { invalid: 'data' };
        mockedApi.get.mockResolvedValueOnce(malformedData);

        const { result } = renderHook(() => useGetUsers(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingUsers).toBe(false);
        });

        expect(result.current.usersData).toEqual(malformedData);
        expect(result.current.usersError).toBe(false);
      });
    });
  });

  describe('useGetStats Hook', () => {
    describe('Positive scenarios', () => {
      it('should fetch stats successfully', async () => {
        mockedApi.get.mockResolvedValueOnce(mockStats);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        // Initially loading
        expect(result.current.loadingStats).toBe(true);
        expect(result.current.stats).toBeUndefined();
        expect(result.current.statsError).toBe(false);

        // Wait for the query to complete
        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        expect(result.current.stats).toEqual(mockStats);
        expect(result.current.statsError).toBe(false);
        expect(mockedApi.get).toHaveBeenCalledWith({
          url: expect.stringContaining('/407b-277a-40ab-90b0'),
          auth: true,
        });
      });

      it('should return stats with correct properties', async () => {
        mockedApi.get.mockResolvedValueOnce(mockStats);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        const stats = result.current.stats;
        expect(stats).toHaveProperty('totalUsers');
        expect(stats).toHaveProperty('activeUsers');
        expect(stats).toHaveProperty('loanUsers');
        expect(stats).toHaveProperty('savingsUsers');
        expect(typeof stats?.totalUsers).toBe('number');
        expect(typeof stats?.activeUsers).toBe('number');
      });

      it('should provide refetch function for stats', async () => {
        mockedApi.get.mockResolvedValueOnce(mockStats);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        expect(typeof result.current.refetch).toBe('function');
      });
    });

    describe('Negative scenarios', () => {
      it('should handle stats API errors', async () => {
        const apiError = new Error('Failed to fetch statistics');
        mockedApi.get.mockRejectedValueOnce(apiError);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        expect(result.current.statsError).toBe(true);
        expect(result.current.stats).toBeUndefined();
      });

      it('should handle missing stats properties', async () => {
        const incompleteStats = { totalUsers: 100 }; // Missing other properties
        mockedApi.get.mockResolvedValueOnce(incompleteStats);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        expect(result.current.stats).toEqual(incompleteStats);
        expect(result.current.statsError).toBe(false);
      });

      it('should handle unauthorized access (401)', async () => {
        const unauthorizedError = new Error('Unauthorized');
        mockedApi.get.mockRejectedValueOnce(unauthorizedError);

        const { result } = renderHook(() => useGetStats(), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.loadingStats).toBe(false);
        });

        expect(result.current.statsError).toBe(true);
        expect(result.current.stats).toBeUndefined();
      });
    });
  });

  describe('Integration scenarios', () => {
    it('should handle concurrent requests for users and stats', async () => {
      mockedApi.get
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(mockStats);

      const { result: usersResult } = renderHook(() => useGetUsers(), {
        wrapper: createWrapper(),
      });

      const { result: statsResult } = renderHook(() => useGetStats(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(usersResult.current.loadingUsers).toBe(false);
        expect(statsResult.current.loadingStats).toBe(false);
      });

      expect(usersResult.current.usersData).toEqual(mockUsers);
      expect(statsResult.current.stats).toEqual(mockStats);
    });

    it('should maintain separate error states', async () => {
      mockedApi.get
        .mockResolvedValueOnce(mockUsers) // Users succeed
        .mockRejectedValueOnce(new Error('Stats failed')); // Stats fail

      const { result: usersResult } = renderHook(() => useGetUsers(), {
        wrapper: createWrapper(),
      });

      const { result: statsResult } = renderHook(() => useGetStats(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(usersResult.current.loadingUsers).toBe(false);
        expect(statsResult.current.loadingStats).toBe(false);
      });

      expect(usersResult.current.usersError).toBe(false);
      expect(usersResult.current.usersData).toEqual(mockUsers);
      
      expect(statsResult.current.statsError).toBe(true);
      expect(statsResult.current.stats).toBeUndefined();
    });
  });
});