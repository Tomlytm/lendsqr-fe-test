import React from 'react';
import './MiniSidebar.scss';
import { AuditLog, DecisionModel, FeesCharge, FeesPricing, Guarantors, Karma, LoanProducts, LoanRequest, Loans, Organization, Preference, Reports, Savings, ServiceAccount, Services, Settlements, SystemsMessages, Transactions, Users, Whitelist } from './SidebarIcons.tsx';

const MiniSidebar: React.FC = () => {
  return (
    <div className="minisidebar">
      <nav className="sidebar__nav">
        <div className="section">
          <div className="section-title">Customers</div>
          <ul>
            <li className="active">
              <Users />
              Users
            </li>
            <li>
              <Guarantors />
              Guarantors
            </li>
            <li>
              <Loans />
              Loans
            </li>
            <li>
              <DecisionModel />
              Decision Models
            </li>
            <li>
              <Savings />
              Savings
            </li>
            <li>
              <LoanRequest />
              Loan Requests
            </li>
            <li>
              <Whitelist />
              Whitelist
            </li>
            <li>
              <Karma />
              Karma
            </li>
          </ul>
        </div>
        <div className="section">
          <div className="section-title">Businesses</div>
          <ul>
            <li>
              <Organization />
              Organization
            </li>
            <li>
              <LoanProducts />
              Loan Products
            </li>
            <li>
              <FeesCharge />
              Fees and Charges
            </li>
            <li>
              <Transactions />
              Transactions
            </li>
            <li>
              <Services />
              Services
            </li>
            <li><ServiceAccount /> Service Account</li>
            <li><Settlements /> Settlements</li>
            <li><Reports /> Reports</li>
          </ul>
        </div>
        <div className="section">
          <div className="section-title">Settings</div>
          <ul>
            <li>
              <Preference />
              Preferences
            </li>
            <li>
              <FeesPricing />
              Fees and Pricing
            </li>
            <li>
              <AuditLog />
              Audit Logs
            </li>
            <li><SystemsMessages /> Systems Messages</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MiniSidebar;
