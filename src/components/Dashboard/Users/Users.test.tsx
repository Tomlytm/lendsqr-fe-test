import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersDashboard from './index.tsx';
import { useGetUsers } from '../../../services/hooks/user-manager';

jest.mock('../../../services/hooks/user-manager', () => ({
  useGetUsers: jest.fn(),
}));

const mockUsers = [
  {
    id: 1,
    organization: 'Org1',
    personalInformation: {
      username: 'john_doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    },
    dateJoined: '2025-01-01',
    status: 'Active',
  },
  {
    id: 2,
    organization: 'Org2',
    personalInformation: {
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      phoneNumber: '0987654321',
    },
    dateJoined: '2025-01-02',
    status: 'Inactive',
  },
];

describe('UsersDashboard', () => {
  it('displays loading message while fetching users', () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      usersData: null,
      loadingUsers: true,
      usersError: null,
    });

    render(
      <BrowserRouter>
        <UsersDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('renders users when data is fetched', async () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      usersData: mockUsers,
      loadingUsers: false,
      usersError: null,
    });

    render(
      <BrowserRouter>
        <UsersDashboard />
      </BrowserRouter>
    );

    // Check that user data is displayed in the table
    expect(await screen.findByText(/Org1/i)).toBeInTheDocument();
    expect(screen.getByText(/john_doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
  });

  it('filters users based on input', async () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      usersData: mockUsers,
      loadingUsers: false,
      usersError: null,
    });

    render(
      <BrowserRouter>
        <UsersDashboard />
      </BrowserRouter>
    );

    const usernameFilter = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameFilter, { target: { value: 'jane_doe' } });

    await waitFor(() => {
      expect(screen.queryByText(/john_doe/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message if fetching fails', () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      usersData: null,
      loadingUsers: false,
      usersError: 'Failed to fetch',
    });

    render(
      <BrowserRouter>
        <UsersDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
