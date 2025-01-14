import React from 'react';
import './Sidebar.scss';
import {
  ArrowDown,
  AuditLog,
  Dashboard,
  DecisionModel,
  FeesCharge,
  FeesPricing,
  Guarantors,
  Karma,
  LoanProducts,
  LoanRequest,
  Loans,
  Logout,
  Organization,
  Preference,
  Reports,
  Savings,
  ServiceAccount,
  Services,
  Settlements,
  SwitchOrg,
  SystemsMessages,
  Transactions,
  Users,
  Whitelist,
} from './SidebarIcons.tsx';

interface NavItem {
  icon: React.FC;
  label: string;
  isActive?: boolean;
}

const Sidebar: React.FC = () => {
  const customerNavItems: NavItem[] = [
    { icon: Users, label: 'Users', isActive: true },
    { icon: Guarantors, label: 'Guarantors' },
    { icon: Loans, label: 'Loans' },
    { icon: DecisionModel, label: 'Decision Models' },
    { icon: Savings, label: 'Savings' },
    { icon: LoanRequest, label: 'Loan Requests' },
    { icon: Whitelist, label: 'Whitelist' },
    { icon: Karma, label: 'Karma' },
  ];

  const businessNavItems: NavItem[] = [
    { icon: Organization, label: 'Organization' },
    { icon: LoanProducts, label: 'Loan Products' },
    { icon: FeesCharge, label: 'Fees and Charges' },
    { icon: Transactions, label: 'Transactions' },
    { icon: Services, label: 'Services' },
    { icon: ServiceAccount, label: 'Service Account' },
    { icon: Settlements, label: 'Settlements' },
    { icon: Reports, label: 'Reports' },
  ];

  const settingsNavItems: NavItem[] = [
    { icon: Preference, label: 'Preferences' },
    { icon: FeesPricing, label: 'Fees and Pricing' },
    { icon: AuditLog, label: 'Audit Logs' },
    { icon: SystemsMessages, label: 'Systems Messages' },
  ];

  const renderNavItems = (items: NavItem[]) => (
    <ul>
      {items.map(({ icon: Icon, label, isActive }, index) => (
        <li key={index} className={isActive ? 'active' : ''}>
          <Icon />
          {label}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <div className="section">
          <ul>
            <li>
              <SwitchOrg />
              Switch Organization
              <ArrowDown />
            </li>
            <li>
              <Dashboard />
              Dashboard
            </li>
          </ul>
        </div>

        <div className="section">
          <div className="section-title">Customers</div>
          {renderNavItems(customerNavItems)}
        </div>

        <div className="section">
          <div className="section-title">Businesses</div>
          {renderNavItems(businessNavItems)}
        </div>

        <div className="section">
          <div className="section-title">Settings</div>
          {renderNavItems(settingsNavItems)}
        </div>
        <div className="section logout">
          <hr />
          <ul>
            <li>
              <Logout />
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
