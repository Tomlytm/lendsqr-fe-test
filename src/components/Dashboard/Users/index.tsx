import React, { useEffect, useState } from "react";
import "./User.scss";
import { Popover, OverlayTrigger, CloseButton } from "react-bootstrap";
import FilterForm from "../../Filter/FilterForm.tsx";
import { ActionMenu, ActivateUser, ActiveUsers, BlacklistUser, Filter, LoanUsers, Next, Previous, SavingsUsers, Users, ViewUser } from "../DashboardIcons.tsx";
import { useGetUsers } from "../../../services/hooks/user-manager/index.ts";
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { saveLocalStorage } from "../../../services/helper.ts";
import { User, UserFilters } from "../../../types/user.ts";
const UsersDashboard: React.FC = () => {
  const navigate = useNavigate();


  const headers = [
    { name: "ORGANIZATION", filterType: "select" },
    { name: "USERNAME", filterType: "text" },
    { name: "EMAIL", filterType: "text" },
    { name: "PHONE NUMBER", filterType: "text" },
    { name: "DATE JOINED", filterType: "date" },
    { name: "STATUS", filterType: "select" },
  ];
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [popover, setPopover] = useState<number | null>(null);

  const handleIconClick = (headerName: string) => {
    setOpenPopover(openPopover === headerName ? null : headerName);
  };
  const handleMenuClick = (headerName: number) => {
    setPopover(popover === headerName ? null : headerName);
  };

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>({
    organization: "",
    username: "",
    email: "",
    phoneNumber: "",
    date: "",
    status: "",
  });
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;

  const { usersData, loadingUsers, usersError } = useGetUsers("2acd43e6-bf0c-49c7-b8fa-1a0e0ce7f321");
  const handleReset = () => {
    if (usersData) {
      setFilters({
        organization: '',
        username: '',
        email: '',
        phoneNumber: '',
        date: '',
        status: '',
      });
      setFilteredUsers(usersData);

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
  };

  const indexOfLastUser = (pageNumber + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const handleView = (user: User) => {
    saveLocalStorage(user, 'selectedUser')
    navigate(`/dashboard/users/${user.id}`);
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPageNumber(selectedPage.selected);
  };


  if (loadingUsers) {
    return <div>Loading users...</div>;
  }

  if (usersError) {
    return <div>Error</div>;
  }

  return (
    <div className="users-dashboard">
      <h3>Users</h3>
      <div className="cards">
        <div className="card">
          <Users />
          <h3>USERS</h3>
          <p>2,453</p>
        </div>
        <div className="card">
          <ActiveUsers />
          <h3>ACTIVE USERS</h3>
          <p>2,453</p>
        </div>
        <div className="card">
          <LoanUsers />
          <h3>USERS WITH LOANS</h3>
          <p>12,453</p>

        </div>
        <div className="card">
          <SavingsUsers />
          <h3>USERS WITH SAVINGS</h3>
          <p>102,453</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-scroll">
          <table className="user-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>
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
                    <td>{user.organization}</td>
                    <td>{user.personalInformation.username}</td>
                    <td>{user.personalInformation.email}</td>
                    <td>{user.personalInformation.phoneNumber}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={`status ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="menu">
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        show={popover === user.id}
                        overlay={
                          <Popover id={`popover-$user.name}`}>
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
                  <td colSpan={7}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
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
          </div>

          {/* React Paginate Component */}
          <ReactPaginate
            previousLabel={<Previous />}
            nextLabel={<Next />}
            breakLabel={"..."}
            breakClassName={"dots"}
            pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
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
    </div>
  );
};

export default UsersDashboard;
