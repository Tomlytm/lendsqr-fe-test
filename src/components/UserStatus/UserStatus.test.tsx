import React from 'react';
import { render, screen } from '@testing-library/react';
import UserStatus from './UserStatus';
import '@testing-library/jest-dom';

describe('UserStatus Component', () => {
  describe('Positive scenarios', () => {
    it('should render Active status correctly', () => {
      render(<UserStatus status="Active" />);
      
      const statusElement = screen.getByText('Active');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass('user-status');
      expect(statusElement).toHaveClass('user-status--active');
    });

    it('should render Inactive status correctly', () => {
      render(<UserStatus status="Inactive" />);
      
      const statusElement = screen.getByText('Inactive');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass('user-status');
      expect(statusElement).toHaveClass('user-status--inactive');
    });

    it('should render Pending status correctly', () => {
      render(<UserStatus status="Pending" />);
      
      const statusElement = screen.getByText('Pending');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass('user-status');
      expect(statusElement).toHaveClass('user-status--pending');
    });

    it('should render Blacklisted status correctly', () => {
      render(<UserStatus status="Blacklisted" />);
      
      const statusElement = screen.getByText('Blacklisted');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass('user-status');
      expect(statusElement).toHaveClass('user-status--blacklisted');
    });

    it('should apply correct CSS classes for different statuses', () => {
      const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'] as const;
      
      statuses.forEach(status => {
        const { unmount } = render(<UserStatus status={status} />);
        const statusElement = screen.getByText(status);
        
        expect(statusElement).toHaveClass('user-status');
        expect(statusElement).toHaveClass(`user-status--${status.toLowerCase()}`);
        
        unmount();
      });
    });

    it('should render as a span element', () => {
      render(<UserStatus status="Active" />);
      
      const statusElement = screen.getByText('Active');
      expect(statusElement.tagName).toBe('SPAN');
    });

    it('should have consistent structure for all status types', () => {
      const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'] as const;
      
      statuses.forEach(status => {
        const { unmount } = render(<UserStatus status={status} />);
        const statusElement = screen.getByText(status);
        
        // Check that it's a span with the base class
        expect(statusElement.tagName).toBe('SPAN');
        expect(statusElement).toHaveClass('user-status');
        
        // Check text content matches status
        expect(statusElement).toHaveTextContent(status);
        
        unmount();
      });
    });
  });

  describe('Component styling and accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<UserStatus status="Active" />);
      
      const statusElement = screen.getByText('Active');
      
      // Should be a span (inline element) for proper semantic usage
      expect(statusElement.tagName).toBe('SPAN');
    });

    it('should be accessible by text content', () => {
      render(<UserStatus status="Pending" />);
      
      // Should be findable by its text
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('should apply both base and modifier classes', () => {
      render(<UserStatus status="Blacklisted" />);
      
      const statusElement = screen.getByText('Blacklisted');
      
      // Should have base class for common styling
      expect(statusElement).toHaveClass('user-status');
      
      // Should have specific modifier class for status-specific styling
      expect(statusElement).toHaveClass('user-status--blacklisted');
      
      // Should not have other status classes
      expect(statusElement).not.toHaveClass('user-status--active');
      expect(statusElement).not.toHaveClass('user-status--inactive');
      expect(statusElement).not.toHaveClass('user-status--pending');
    });
  });

  describe('Props handling', () => {
    it('should handle status prop correctly', () => {
      const { rerender } = render(<UserStatus status="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
      
      rerender(<UserStatus status="Inactive" />);
      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.queryByText('Active')).not.toBeInTheDocument();
    });

    it('should maintain correct class mapping', () => {
      const statusClassMap = {
        Active: 'user-status--active',
        Inactive: 'user-status--inactive', 
        Pending: 'user-status--pending',
        Blacklisted: 'user-status--blacklisted'
      };

      Object.entries(statusClassMap).forEach(([status, expectedClass]) => {
        const { unmount } = render(<UserStatus status={status as any} />);
        const statusElement = screen.getByText(status);
        
        expect(statusElement).toHaveClass(expectedClass);
        
        unmount();
      });
    });
  });

  describe('Component integration', () => {
    it('should work correctly when used multiple times', () => {
      render(
        <div>
          <UserStatus status="Active" />
          <UserStatus status="Pending" />
          <UserStatus status="Inactive" />
        </div>
      );
      
      expect(screen.getByText('Active')).toHaveClass('user-status--active');
      expect(screen.getByText('Pending')).toHaveClass('user-status--pending');
      expect(screen.getByText('Inactive')).toHaveClass('user-status--inactive');
    });

    it('should not interfere with other components', () => {
      render(
        <div>
          <span className="other-component">Other</span>
          <UserStatus status="Active" />
          <span className="another-component">Another</span>
        </div>
      );
      
      expect(screen.getByText('Other')).toHaveClass('other-component');
      expect(screen.getByText('Active')).toHaveClass('user-status--active');
      expect(screen.getByText('Another')).toHaveClass('another-component');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle rapid status changes', () => {
      const { rerender } = render(<UserStatus status="Active" />);
      
      const statusElement = () => screen.getByText(/Active|Pending|Inactive|Blacklisted/);
      
      rerender(<UserStatus status="Pending" />);
      expect(statusElement()).toHaveTextContent('Pending');
      
      rerender(<UserStatus status="Blacklisted" />);
      expect(statusElement()).toHaveTextContent('Blacklisted');
      
      rerender(<UserStatus status="Inactive" />);
      expect(statusElement()).toHaveTextContent('Inactive');
    });

    it('should maintain performance with repeated renders', () => {
      const { rerender } = render(<UserStatus status="Active" />);
      
      // Simulate rapid re-renders
      for (let i = 0; i < 10; i++) {
        const status = i % 2 === 0 ? 'Active' : 'Inactive';
        rerender(<UserStatus status={status} />);
        expect(screen.getByText(status)).toBeInTheDocument();
      }
    });
  });

  describe('TypeScript integration', () => {
    it('should only accept valid status values', () => {
      // These should compile and render correctly
      render(<UserStatus status="Active" />);
      render(<UserStatus status="Inactive" />);
      render(<UserStatus status="Pending" />);
      render(<UserStatus status="Blacklisted" />);
      
      // Verify all render correctly
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('Blacklisted')).toBeInTheDocument();
    });
  });
});