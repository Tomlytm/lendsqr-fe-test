import React from 'react';
import './UserStatus.scss';

type UserStatusType = "Active" | "Inactive" | "Pending" | "Blacklisted";

interface UserStatusProps {
  status: UserStatusType;
}

const UserStatus: React.FC<UserStatusProps> = ({ status }) => {
  return (
    <span className={`user-status user-status--${status.toLowerCase()}`}>
      {status}
    </span>
  );
};

export default UserStatus;