// Mock axios first
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  isAxiosError: jest.fn(),
}));

jest.mock('../axiosConfig', () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import api from './index';

const mockAxios = require('axios');
const { axiosInstance: mockAxiosInstance } = require('../axiosConfig');

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET requests', () => {
    describe('Positive scenarios', () => {
      it('should make authenticated GET request successfully', async () => {
        const mockData = { users: [{ id: 1, name: 'John' }] };
        const mockResponse = { data: mockData };
        
        mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

        const result = await api.get({ url: '/users', auth: true });

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users');
        expect(result).toEqual(mockData);
      });

      it('should make unauthenticated GET request successfully', async () => {
        const mockData = { public: 'data' };
        const mockResponse = { data: mockData };
        
        mockAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await api.get({ url: '/public', auth: false });

        expect(mockAxios.get).toHaveBeenCalledWith('/public');
        expect(result).toEqual(mockData);
      });

      it('should default to authenticated request when auth not specified', async () => {
        const mockData = { data: 'test' };
        const mockResponse = { data: mockData };
        
        mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

        const result = await api.get({ url: '/default' });

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/default');
        expect(result).toEqual(mockData);
      });
    });

    describe('Negative scenarios', () => {
      it('should handle network errors', async () => {
        const networkError = new Error('Network Error');
        mockAxiosInstance.get.mockRejectedValueOnce(networkError);

        await expect(api.get({ url: '/users' })).rejects.toThrow('An unexpected error occurred');
      });

      it('should handle 404 errors', async () => {
        const notFoundError = {
          response: {
            status: 404,
            data: { message: 'User not found' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.get.mockRejectedValueOnce(notFoundError);

        await expect(api.get({ url: '/users/999' })).rejects.toThrow('User not found');
      });

      it('should handle 500 server errors', async () => {
        const serverError = {
          response: {
            status: 500,
            data: { message: 'Internal Server Error' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.get.mockRejectedValueOnce(serverError);

        await expect(api.get({ url: '/users' })).rejects.toThrow('Internal Server Error');
      });

      it('should handle timeout errors', async () => {
        const timeoutError = {
          response: undefined,
          message: 'Request timeout',
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.get.mockRejectedValueOnce(timeoutError);

        await expect(api.get({ url: '/users' })).rejects.toThrow('Request timeout');
      });
    });
  });

  describe('POST requests', () => {
    describe('Positive scenarios', () => {
      it('should make POST request with body successfully', async () => {
        const requestBody = { name: 'John', email: 'john@example.com' };
        const responseData = { id: 1, ...requestBody };
        const mockResponse = { data: responseData };
        
        mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

        const result = await api.post({ url: '/users', body: requestBody });

        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', requestBody);
        expect(result).toEqual(responseData);
      });

      it('should make POST request without body successfully', async () => {
        const responseData = { message: 'Success' };
        const mockResponse = { data: responseData };
        
        mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

        const result = await api.post({ url: '/users/1/activate' });

        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users/1/activate', undefined);
        expect(result).toEqual(responseData);
      });
    });

    describe('Negative scenarios', () => {
      it('should handle validation errors (400)', async () => {
        const validationError = {
          response: {
            status: 400,
            data: { message: 'Email is required' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.post.mockRejectedValueOnce(validationError);

        await expect(api.post({ url: '/users', body: { name: 'John' } }))
          .rejects.toThrow('Email is required');
      });

      it('should handle authentication errors (401)', async () => {
        const authError = {
          response: {
            status: 401,
            data: { message: 'Unauthorized' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.post.mockRejectedValueOnce(authError);

        await expect(api.post({ url: '/users' })).rejects.toThrow('Unauthorized');
      });
    });
  });

  describe('PUT requests', () => {
    describe('Positive scenarios', () => {
      it('should make PUT request successfully', async () => {
        const updateData = { name: 'John Updated' };
        const responseData = { id: 1, ...updateData };
        const mockResponse = { data: responseData };
        
        mockAxiosInstance.put.mockResolvedValueOnce(mockResponse);

        const result = await api.put({ url: '/users/1', body: updateData });

        expect(mockAxiosInstance.put).toHaveBeenCalledWith('/users/1', updateData);
        expect(result).toEqual(responseData);
      });
    });

    describe('Negative scenarios', () => {
      it('should handle not found errors on PUT', async () => {
        const notFoundError = {
          response: {
            status: 404,
            data: { message: 'User not found' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.put.mockRejectedValueOnce(notFoundError);

        await expect(api.put({ url: '/users/999', body: {} }))
          .rejects.toThrow('User not found');
      });
    });
  });

  describe('DELETE requests', () => {
    describe('Positive scenarios', () => {
      it('should make DELETE request successfully', async () => {
        const responseData = { message: 'User deleted successfully' };
        const mockResponse = { data: responseData };
        
        mockAxiosInstance.delete.mockResolvedValueOnce(mockResponse);

        const result = await api.delete({ url: '/users/1' });

        expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1', { data: undefined });
        expect(result).toEqual(responseData);
      });

      it('should make DELETE request with body successfully', async () => {
        const deleteData = { reason: 'Requested by user' };
        const responseData = { message: 'User deleted successfully' };
        const mockResponse = { data: responseData };
        
        mockAxiosInstance.delete.mockResolvedValueOnce(mockResponse);

        const result = await api.delete({ url: '/users/1', body: deleteData });

        expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1', { data: deleteData });
        expect(result).toEqual(responseData);
      });
    });

    describe('Negative scenarios', () => {
      it('should handle forbidden errors (403)', async () => {
        const forbiddenError = {
          response: {
            status: 403,
            data: { message: 'Forbidden: Cannot delete this user' }
          },
          isAxiosError: true
        };
        
        mockAxios.isAxiosError.mockReturnValueOnce(true);
        mockAxiosInstance.delete.mockRejectedValueOnce(forbiddenError);

        await expect(api.delete({ url: '/users/1' }))
          .rejects.toThrow('Forbidden: Cannot delete this user');
      });
    });
  });

  describe('ApiError class', () => {
    it('should create ApiError with message and status', async () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Server Error' }
        },
        isAxiosError: true
      };
      
      mockAxios.isAxiosError.mockReturnValueOnce(true);
      mockAxiosInstance.get.mockRejectedValueOnce(error);

      try {
        await api.get({ url: '/users' });
      } catch (apiError: any) {
        expect(apiError.name).toBe('ApiError');
        expect(apiError.message).toBe('Server Error');
      }
    });

    it('should create ApiError with default message for non-Axios errors', async () => {
      const genericError = new Error('Generic error');
      mockAxios.isAxiosError.mockReturnValueOnce(false);
      mockAxiosInstance.get.mockRejectedValueOnce(genericError);

      try {
        await api.get({ url: '/users' });
      } catch (apiError: any) {
        expect(apiError.name).toBe('ApiError');
        expect(apiError.message).toBe('An unexpected error occurred');
      }
    });
  });
});