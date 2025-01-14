import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Layout from './components/Layout/Layout.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/login/index.tsx';
import UsersPage from './pages/dashboard/users/index.tsx';
import UserDetailPage from './pages/dashboard/users/user-detail.tsx';
const App: React.FC = () => {
  return (
    <Router>
      <ConditionalLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users/:id"
            element={
              <ProtectedRoute>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ConditionalLayout>
    </Router>
  );
};

const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};

export default App;
