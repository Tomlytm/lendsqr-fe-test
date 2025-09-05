import React, { useEffect, useState } from "react";
import "./User.scss";
import { Popover, OverlayTrigger, CloseButton } from "react-bootstrap";
import FilterForm from "../../Filter/FilterForm.tsx";
import { ActionMenu, ActivateUser, ActiveUsers, BlacklistUser, EmptyState, Filter, LoanUsers, Next, Previous, SavingsUsers, Users, ViewUser } from "../DashboardIcons.tsx";
import { useGetStats, useGetUsers } from "../../../services/hooks/user-manager/index.ts";
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { saveLocalStorage } from "../../../services/helper.ts";
import { User, UserFilters } from "../../../types/user.ts";
import UserStatus from "../../UserStatus/UserStatus.tsx";
const USERS_PER_PAGE = 10;

const TABLE_HEADERS = [
  { name: "ORGANIZATION", filterType: "select" },
  { name: "USERNAME", filterType: "text" },
  { name: "EMAIL", filterType: "text" },
  { name: "PHONE NUMBER", filterType: "text" },
  { name: "DATE JOINED", filterType: "date" },
  { name: "STATUS", filterType: "select" },
] as const;

const INITIAL_FILTERS: UserFilters = {
  organization: "",
  username: "",
  email: "",
  phoneNumber: "",
  date: "",
  status: "",
};

const UsersDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [popover, setPopover] = useState<number | null>(null);

  const handleIconClick = (headerName: string) => {
    setOpenPopover(openPopover === headerName ? null : headerName);
  };
  const handleMenuClick = (headerName: number) => {
    setPopover(popover === headerName ? null : headerName);
  };

  const getInitialFilters = (): UserFilters => {
    const savedFilters = localStorage.getItem('userFilters');
    if (savedFilters) {
      return JSON.parse(savedFilters);
    }
    return INITIAL_FILTERS;
  };

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>(getInitialFilters());
  const [pageNumber, setPageNumber] = useState(0);

  const { usersData, loadingUsers, usersError } = useGetUsers();
  const { stats, loadingStats, statsError } = useGetStats();
  const handleReset = () => {
    if (usersData) {
      setFilters(INITIAL_FILTERS);
      setFilteredUsers(usersData);
      setOpenPopover(null); // Close the filter popover
      localStorage.removeItem('userFilters');
    }
  };

  useEffect(() => {
    if (usersData) {
      setFilteredUsers(
        usersData.filter((user) => {
          return (
            (filters.organization === "" || user.organization.includes(filters.organization)) &&
            (filters.username === "" || user.personalInformation.username.includes(filters.username)) &&
            (filters.email === "" || user.personalInformation.email.includes(filters.email)) &&
            (filters.phoneNumber === "" || user.personalInformation.phoneNumber.toString().includes(filters.phoneNumber)) &&
            (filters.date === "" || user.dateJoined === filters.date) &&
            (filters.status === "" || user.status === filters.status)
          );
        })
      );
    }
  }, [filters, usersData]);

  const handleFilterSubmit = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setOpenPopover(null); 
  };

  const indexOfLastUser = (pageNumber + 1) * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const handleView = (user: User) => {
    saveLocalStorage(user, 'selectedUser')
    navigate(`/dashboard/users/${user.id}`);
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPageNumber(selectedPage.selected);
  };


  if (loadingUsers) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="error-state">
        <h3>Something went wrong</h3>
        <p>We couldn't load the users data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="users-dashboard">
      <h3>Users</h3>
      {
        loadingStats ? (
          <div className="loading-stats">
            <span>Loading stats...</span>
          </div>
        ) : statsError ? (
          <div className="error-stats">
            <span>Unable to load statistics</span>
          </div>
        ) : (
          <div className="cards">
            <div className="card">
              <Users />
              <h3>USERS</h3>
              <p>{stats?.totalUsers}</p>
            </div>
            <div className="card">
              <ActiveUsers />
              <h3>ACTIVE USERS</h3>
              <p>{stats?.activeUsers}</p>
            </div>
            <div className="card">
              <LoanUsers />
              <h3>USERS WITH LOANS</h3>
              <p>{stats?.loanUsers}</p>

            </div>
            <div className="card">
              <SavingsUsers />
              <h3>USERS WITH SAVINGS</h3>
              <p>{stats?.savingsUsers}</p>
            </div>
          </div>
        )
      }

      {/* Table */}
      <div className="table-container">
        {/* Desktop and Tablet Table View */}
        <div className="table-scroll desktop-table">
          <table className="user-table">
            <thead>
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th key={index} className={`col-${index + 1}`}>
                    <div className="header">
                      {header.name}
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        show={openPopover === header.name}
                        overlay={
                          <Popover id={`popover-${header.name}`}>
                            <Popover.Body>
                              <FilterForm users={usersData} onFilterSubmit={handleFilterSubmit} handleReset={handleReset} />
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        {openPopover === header.name ?
                          (
                            <div className="filter" onClick={() => handleIconClick(header.name)}>
                              <CloseButton />
                            </div>
                          ) :
                          (
                            <div className="filter" onClick={() => handleIconClick(header.name)}>
                              <Filter />
                            </div>
                          )
                        }
                      </OverlayTrigger>
                    </div>
                  </th>
                ))}
                <th className="action-head"></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length ? (
                currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="col-1">{user.organization}</td>
                    <td className="col-2">{user.personalInformation.username}</td>
                    <td className="col-3">{user.personalInformation.email}</td>
                    <td className="col-4">{user.personalInformation.phoneNumber}</td>
                    <td className="col-5">{user.dateJoined}</td>
                    <td className="col-6">
                      <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <UserStatus status={user.status} />
                      </div>
                    </td>
                    <td className="menu">
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        show={popover === user.id}
                        overlay={
                          <Popover id={`popover-${user.id}`}>
                            <Popover.Body>
                              <div className="side-menu">
                                <div onClick={() => handleView(user)}>
                                  <ViewUser /> View User</div>
                                <div>
                                  <BlacklistUser /> Blacklist User</div>
                                <div>
                                  <ActivateUser />  Activate User</div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        {popover === user.id ? (
                          <button onClick={() => handleMenuClick(user.id)} title="options" className="menu-button">
                            <CloseButton />
                          </button>
                        ) : (
                          <button onClick={() => handleMenuClick(user.id)} title="options" className="menu-button">
                            <ActionMenu />
                          </button>
                        )
                        }
                      </OverlayTrigger>
                    </td>
                  </tr>))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-state">
                    <div className="empty-state-content">
                      <EmptyState />
                      <h3>No Users Found</h3>
                      <p>We couldn't find any users matching your search criteria. Try adjusting your filters or check back later.</p>
                      <button className="btn reset-btn" onClick={handleReset}>
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Filter Bar */}
        <div className="mobile-filter-bar">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={openPopover === 'mobile-filter'}
            overlay={
              <Popover id="popover-mobile-filter">
                <Popover.Body>
                  <FilterForm users={usersData} onFilterSubmit={handleFilterSubmit} handleReset={handleReset} />
                </Popover.Body>
              </Popover>
            }
          >
            <button
              className="mobile-filter-button"
              onClick={() => handleIconClick('mobile-filter')}
            >
              <Filter />
              <span>Filter Users</span>
              {(filters.organization || filters.username || filters.email || filters.phoneNumber || filters.date || filters.status) && (
                <span className="filter-active-indicator"></span>
              )}
            </button>
          </OverlayTrigger>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-cards">
          {currentUsers.length ? (
            currentUsers.map((user, index) => (
              <div key={index} className="user-card-mobile">
                <div className="card-header">
                  <div className="user-info">
                    <h4>{user.personalInformation.username}</h4>
                    <p className="user-email">{user.personalInformation.email}</p>
                  </div>
                  <div className="card-status">
                    <UserStatus status={user.status} />
                    <div className="menu">
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        show={popover === user.id}
                        overlay={
                          <Popover id={`popover-mobile-${user.id}`}>
                            <Popover.Body>
                              <div className="side-menu">
                                <div onClick={() => handleView(user)}>
                                  <ViewUser /> View User</div>
                                <div>
                                  <BlacklistUser /> Blacklist User</div>
                                <div>
                                  <ActivateUser /> Activate User</div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <button onClick={() => handleMenuClick(user.id)} title="options" className="menu-button">
                          <ActionMenu />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="org-info">
                    <span className="org-label">{user.organization}</span>
                  </div>
                  <div className="date-info">
                    <span className="date-label">Joined {user.dateJoined}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-mobile">
              <div className="empty-state-content">
                <EmptyState />
                <h3>No Users Found</h3>
                <p>We couldn't find any users matching your search criteria. Try adjusting your filters or check back later.</p>
                <button className="btn reset-btn" onClick={handleReset}>
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
        <div className="pagination-container">
          {/* Dropdown for selecting items per page */}
          <div className="dropdown">
            <label htmlFor="items-per-page">Showing</label>
            <select id="items-per-page" name="items-per-page">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>out of {filteredUsers.length}</span>
          </div>

          {/* React Paginate Component */}
          <ReactPaginate
            previousLabel={<Previous />}
            nextLabel={<Next />}
            breakLabel={"..."}
            breakClassName={"dots"}
            pageCount={Math.ceil(filteredUsers.length / USERS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page"}
            pageLinkClassName={"page-link"}
            previousClassName={"navigation"}
            nextClassName={"navigation"}
            activeClassName={"selected"}
            disabledClassName={"disabled"}
          />
        </div>
    </div>
  );
};

export default UsersDashboard;
