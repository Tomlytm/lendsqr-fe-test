import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserDetails from './UserDetails.tsx';
import { getLocalStorage } from '../../../../services/helper.ts';

jest.mock('../../../../services/helper', () => ({
  getLocalStorage: jest.fn(),
}));

const mockUser: any = {
  id: 1,
  personalInformation: {
    fullName: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Apartment',
    username: "e"
  },
  educationAndEmployment: {
    levelOfEducation: 'Bachelor',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'Technology',
    durationOfEmployment: '2 years',
    officeEmail: 'john.doe@company.com',
    monthlyIncome: ['100000', '200000'],
    loanRepayment: '50000',
  },
  socials: {
    twitter: '@johndoe',
    facebook: 'john.doe',
    instagram: '@johndoe_insta',
  },
  guarantor: {
    fullName: 'Jane Doe',
    phoneNumber: '0987654321',
    email: 'jane.doe@example.com',
    relationship: 'Sister',
  },
  secondGuarantor: {
    fullName: 'Alex Doe',
    phoneNumber: '1122334455',
    email: 'alex.doe@example.com',
    relationship: 'Friend',
  },
  accountDetails: {
    balance: '500000',
    accountNumber: '123456789012',
    bankName: 'Bank of Nowhere',
  },
  tier: 2,
};

describe('UserDetails', () => {
  beforeEach(() => {
    (getLocalStorage as jest.Mock).mockReturnValue(mockUser);
  });

  it('renders user details correctly', async () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    // Check that user details are displayed correctly
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Bachelor/i)).toBeInTheDocument();
    expect(screen.getByText(/@johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  it('navigates back to users list on back button click', async () => {
    const mockNavigate = jest.fn();
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Back to Users/i));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/users');
    });
  });

  it('displays the correct tab content', async () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    // Initially, the "General Details" tab should be active
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();

    // Click on a different tab and verify content change
    fireEvent.click(screen.getByText(/Documents/i));
    expect(screen.queryByText(/Personal Information/i)).not.toBeInTheDocument();
  });
});
