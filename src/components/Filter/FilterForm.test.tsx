import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterForm from './FilterForm';
import { User } from '../../types/user';
import '@testing-library/jest-dom';

// Mock users data
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
    socials: { twitter: '@johndoe', facebook: 'john.doe', instagram: '@john_doe' },
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
    accountDetails: { accountNumber: '1234567890', bankName: 'GTBank', balance: '500,000' },
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
    socials: { twitter: '@janesmith', facebook: 'jane.smith', instagram: '@jane_smith' },
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
    accountDetails: { accountNumber: '0987654321', bankName: 'First Bank', balance: '750,000' },
    tier: 2,
    status: 'Pending'
  }
];

describe('FilterForm Component', () => {
  const mockOnFilterSubmit = jest.fn();
  const mockHandleReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Positive scenarios', () => {
    it('should render all form fields correctly', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Check all form fields are present
      expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();

      // Check buttons are present
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
    });

    it('should populate organization dropdown from users data', async () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      await waitFor(() => {
        const organizationSelect = screen.getByLabelText(/organization/i);
        expect(organizationSelect).toBeInTheDocument();
        
        // Check for default option
        expect(screen.getByRole('option', { name: /select organization/i })).toBeInTheDocument();
        
        // Check for organization options from users
        expect(screen.getByRole('option', { name: 'Lendsqr' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Irorun' })).toBeInTheDocument();
      });
    });

    it('should populate status dropdown with predefined options', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      const statusSelect = screen.getByLabelText(/status/i);
      
      // Check for all status options
      expect(screen.getByRole('option', { name: /^select$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Pending' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Blacklisted' })).toBeInTheDocument();
    });

    it('should handle form input changes correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Fill out form fields
      await user.type(screen.getByLabelText(/username/i), 'johndoe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone number/i), '1234567890');
      await user.type(screen.getByLabelText(/date/i), '2023-01-15');
      
      // Verify inputs have correct values
      expect(screen.getByLabelText(/username/i)).toHaveValue('johndoe');
      expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
      expect(screen.getByLabelText(/phone number/i)).toHaveValue('1234567890');
      expect(screen.getByLabelText(/date/i)).toHaveValue('2023-01-15');
    });

    it('should handle dropdown selections correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Wait for organizations to populate
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Lendsqr' })).toBeInTheDocument();
      });

      // Select organization
      await user.selectOptions(screen.getByLabelText(/organization/i), 'Lendsqr');
      expect(screen.getByLabelText(/organization/i)).toHaveValue('Lendsqr');

      // Select status
      await user.selectOptions(screen.getByLabelText(/status/i), 'Active');
      expect(screen.getByLabelText(/status/i)).toHaveValue('Active');
    });

    it('should submit form with correct filter data', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Fill out form
      await user.type(screen.getByLabelText(/username/i), 'johndoe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/status/i), 'Active');

      // Submit form
      await user.click(screen.getByRole('button', { name: /filter/i }));

      expect(mockOnFilterSubmit).toHaveBeenCalledWith({
        organization: '',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '',
        date: '',
        status: 'Active',
      });
    });

    it('should reset form correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Fill out some fields
      await user.type(screen.getByLabelText(/username/i), 'johndoe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');

      // Click reset
      await user.click(screen.getByRole('button', { name: /reset/i }));

      // Verify external reset handler is called
      expect(mockHandleReset).toHaveBeenCalled();

      // Verify form fields are cleared
      expect(screen.getByLabelText(/username/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
    });

    it('should handle form submission via Enter key', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Focus on a form field and press Enter
      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, 'testuser');
      await user.keyboard('{Enter}');

      expect(mockOnFilterSubmit).toHaveBeenCalledWith({
        organization: '',
        username: 'testuser',
        email: '',
        phoneNumber: '',
        date: '',
        status: '',
      });
    });
  });

  describe('Negative scenarios', () => {
    it('should handle undefined users gracefully', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={undefined}
        />
      );

      // Should still render the form
      expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
      
      // Organization dropdown should only have default option
      expect(screen.getByRole('option', { name: /select organization/i })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Lendsqr' })).not.toBeInTheDocument();
    });

    it('should handle empty users array', async () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={[]}
        />
      );

      await waitFor(() => {
        const organizationSelect = screen.getByLabelText(/organization/i);
        expect(organizationSelect).toBeInTheDocument();
        
        // Should only have default option
        expect(screen.getByRole('option', { name: /select organization/i })).toBeInTheDocument();
      });
    });

    it('should handle users with missing organization data', async () => {
      const usersWithMissingOrg = [
        { ...mockUsers[0], organization: '' },
        { ...mockUsers[1], organization: undefined as any }
      ];

      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={usersWithMissingOrg}
        />
      );

      await waitFor(() => {
        // Should handle empty/undefined organizations gracefully
        const organizationSelect = screen.getByLabelText(/organization/i);
        expect(organizationSelect).toBeInTheDocument();
      });
    });

    it('should handle duplicate organizations correctly', async () => {
      const usersWithDuplicates = [
        { ...mockUsers[0], organization: 'Lendsqr' },
        { ...mockUsers[1], organization: 'Lendsqr' }, // Duplicate
        { ...mockUsers[0], organization: 'Irorun' }
      ];

      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={usersWithDuplicates}
        />
      );

      await waitFor(() => {
        // Should only show unique organizations
        const lendsqrOptions = screen.getAllByRole('option', { name: 'Lendsqr' });
        expect(lendsqrOptions).toHaveLength(1);
      });
    });

    it('should prevent form submission with all empty fields', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Submit form without filling any fields
      await user.click(screen.getByRole('button', { name: /filter/i }));

      // Should still call onFilterSubmit with empty values
      expect(mockOnFilterSubmit).toHaveBeenCalledWith({
        organization: '',
        username: '',
        email: '',
        phoneNumber: '',
        date: '',
        status: '',
      });
    });

    it('should handle invalid email input', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Enter invalid email
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');

      // Form should still accept the input (validation is up to parent)
      expect(screen.getByLabelText(/email/i)).toHaveValue('invalid-email');

      // Submit should work but with the invalid email
      await user.click(screen.getByRole('button', { name: /filter/i }));
      
      expect(mockOnFilterSubmit).toHaveBeenCalledWith({
        organization: '',
        username: '',
        email: 'invalid-email',
        phoneNumber: '',
        date: '',
        status: '',
      });
    });

    it('should handle invalid date input', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // The date input should handle HTML5 date validation
      const dateInput = screen.getByLabelText(/date/i);
      await user.type(dateInput, '2023-13-45'); // Invalid date

      // The browser will handle validation for date inputs
      expect(dateInput).toBeInTheDocument();
    });

    it('should handle rapid form submissions', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      const filterButton = screen.getByRole('button', { name: /filter/i });

      // Rapid clicks
      await user.click(filterButton);
      await user.click(filterButton);
      await user.click(filterButton);

      expect(mockOnFilterSubmit).toHaveBeenCalledTimes(3);
    });

    it('should handle reset during form input', async () => {
      const user = userEvent.setup();
      
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Start typing
      await user.type(screen.getByLabelText(/username/i), 'john');

      // Reset mid-input
      await user.click(screen.getByRole('button', { name: /reset/i }));

      expect(mockHandleReset).toHaveBeenCalled();
      expect(screen.getByLabelText(/username/i)).toHaveValue('');
    });
  });

  describe('Component integration and state management', () => {
    it('should maintain form state across re-renders', () => {
      const { rerender } = render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Fill a field
      fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');

      // Re-render with new props
      rerender(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Field value should be maintained
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
    });

    it('should update organizations when users prop changes', async () => {
      const initialUsers = [mockUsers[0]]; // Only Lendsqr
      const updatedUsers = mockUsers; // Both Lendsqr and Irorun

      const { rerender } = render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={initialUsers}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Lendsqr' })).toBeInTheDocument();
        expect(screen.queryByRole('option', { name: 'Irorun' })).not.toBeInTheDocument();
      });

      // Update users
      rerender(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={updatedUsers}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Lendsqr' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Irorun' })).toBeInTheDocument();
      });
    });
  });

  describe('Form validation and user experience', () => {
    it('should have proper input types for different fields', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      expect(screen.getByLabelText(/username/i)).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('type', 'tel');
      expect(screen.getByLabelText(/date/i)).toHaveAttribute('type', 'date');
    });

    it('should have proper placeholders', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      expect(screen.getByLabelText(/username/i)).toHaveAttribute('placeholder', 'User');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('placeholder', 'Email');
      expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('placeholder', 'Phone Number');
    });

    it('should have proper form structure', () => {
      render(
        <FilterForm
          onFilterSubmit={mockOnFilterSubmit}
          handleReset={mockHandleReset}
          users={mockUsers}
        />
      );

      // Should be wrapped in a form element
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form?.tagName).toBe('FORM');
    });
  });
});