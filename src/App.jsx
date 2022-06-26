import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import { Header } from './components/Header';
import { Notifications } from './components/Notifications';
import { useAuth } from './hooks/useAuth';
import { Anytime } from './pages/anytime';
import { Completed } from './pages/completed';
import { Error } from './pages/error';
import { Inbox } from './pages/inbox';
import { Login } from './pages/login';
import { Scheduled } from './pages/scheduled';
import { Signup } from './pages/signup';
import { UI } from './pages/ui';

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, isManager, isEmployee, USER_TYPES } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if ((role === USER_TYPES.MANAGER && !isManager) || (role === USER_TYPES.EMPLOYEE && !isEmployee)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { USER_TYPES } = useAuth();

  return (
    <Routes>
      {/* Mixed views */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        } 
      />
      <Route path='/ui' element={<UI />} />
      <Route path='*' element={<Error />} />
      {/* Manager views */}
      <Route 
        path='/completed' 
        element={
          <ProtectedRoute>
            <Completed />
          </ProtectedRoute>
        } 
      />
      {/* Employee views */}
      <Route 
        path='/anytime' 
        element={
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/scheduled' 
        element={
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Scheduled />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </AuthProvider>
    <Notifications />
  </BrowserRouter>
);

export default App;
