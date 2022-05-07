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
import { Scheduler } from './pages/scheduler';
import { Signup } from './pages/signup';
import { UI } from './pages/ui';

const ProtectedRoute = ({ children, userType }) => {
  const { isLoggedIn, isManager, isEmployee, USER_TYPES } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if ((userType === USER_TYPES.MANAGER && !isManager) || (userType === USER_TYPES.EMPLOYEE && !isEmployee)) {
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
        path='/scheduler' 
        element={
          <ProtectedRoute userType={USER_TYPES.MANAGER}>
            <Scheduler />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/completed' 
        element={
          <ProtectedRoute userType={USER_TYPES.MANAGER}>
            <Completed />
          </ProtectedRoute>
        } 
      />
      {/* Employee views */}
      <Route 
        path='/anytime' 
        element={
          <ProtectedRoute userType={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/scheduled' 
        element={
          <ProtectedRoute userType={USER_TYPES.EMPLOYEE}>
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
      <Notifications />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
