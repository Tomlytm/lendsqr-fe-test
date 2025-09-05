// FilterForm.tsx
import React, { useEffect, useState } from 'react';
import './FilterForm.scss';
import { User, UserFilters } from '../../types/user';

interface FilterFormProps {
  onFilterSubmit: (filters: {
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    date: string;
    status: string;
  }) => void;
  handleReset: () => void;
  users: User[] | undefined;
}

const STATUS_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Pending", label: "Pending" },
  { value: "Blacklisted", label: "Blacklisted" },
] as const;

const FilterForm: React.FC<FilterFormProps> = ({ onFilterSubmit, handleReset, users }) => {
  const getInitialFilters = (): UserFilters => {
    const savedFilters = localStorage.getItem('userFilters');
    if (savedFilters) {
      return JSON.parse(savedFilters);
    }
    return {
      organization: '',
      username: '',
      email: '',
      phoneNumber: '',
      date: '',
      status: '',
    };
  };

  const [filters, setFilters] = useState<UserFilters>(getInitialFilters());
  const [organizations, setOrganizations] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    localStorage.setItem('userFilters', JSON.stringify(newFilters));
  };
  const handleResetForm = () => {
    handleReset();
    const resetFilters = {
      organization: '',
      username: '',
      email: '',
      phoneNumber: '',
      date: '',
      status: '',
    };
    setFilters(resetFilters);
    localStorage.removeItem('userFilters');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterSubmit(filters);
  };
  useEffect(() => {
    if (users) {
      const allOrganizations = Array.from(
        new Set(users.map(user => user.organization))
      );
      setOrganizations(allOrganizations)
    }

  }, [users])

  return (
    <form className="filterForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="organization">Organization</label>
        <select id="organization" name="organization" value={filters.organization} onChange={handleChange}>
          <option value="">Select Organization</option>
          {
            organizations?.map((org, i) =>
            (<option value={`${org}`} key={i}>{org}</option>

            ))
          }
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={filters.username} onChange={handleChange} placeholder="User" />
      </div>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={filters.email} onChange={handleChange} placeholder="Email" />
      </div>

      <div className="formGroup">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={filters.date} onChange={handleChange} />
      </div>

      <div className="formGroup">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={filters.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      </div>

      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={filters.status} onChange={handleChange}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="buttonGroup">
        <button type="reset" onClick={handleResetForm} className="resetButton">Reset</button>
        <button type="submit" className="filterButton">Filter</button>
      </div>
    </form>
  );
};

export default FilterForm;
