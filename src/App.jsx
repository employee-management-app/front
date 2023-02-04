import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import { Header } from './components/Header';
import { CreateOrderModal } from './components/CreateOrderModal';
import { EditOrderModal } from './components/EditOrderModal';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { EditEmployeeModal } from './components/EditEmployeeModal';
import { CompleteOrderModal } from './components/CompleteOrderModal';
import { DeleteOrderModal } from './components/DeleteOrderModal';
import { AssignOrderModal } from './components/AssignOrderModal';
import { ScheduleOrderModal } from './components/ScheduleOrderModal';
import { Notifications } from './components/Notifications';
import { useAuth } from './hooks/useAuth';
import { Anytime } from './pages/anytime';
import { Completed } from './pages/completed';
import { Employees } from './pages/employees';
import { Error } from './pages/error';
import { Inbox } from './pages/inbox';
import { Invitation } from './pages/invitation';
import { Login } from './pages/login';
import { Scheduled } from './pages/scheduled';
import { Signup } from './pages/signup';
import { Order } from './pages/order';
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/invitation/:token" element={<Invitation />} />
      <Route
        path="/"
        element={(
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/list"
        element={(
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/timeline"
        element={(
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/calendar"
        element={(
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/orders/:id"
        element={(
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/completed"
        element={(
          <ProtectedRoute>
            <Completed />
          </ProtectedRoute>
        )}
      />
      <Route path="/ui" element={<UI />} />
      <Route path="*" element={<Error />} />
      {/* Manager views */}
      <Route
        path="/employees"
        element={(
          <ProtectedRoute role={USER_TYPES.MANAGER}>
            <Employees />
          </ProtectedRoute>
        )}
      />
      {/* Employee views */}
      <Route
        path="/anytime"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/anytime/list"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/anytime/timeline"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/anytime/calendar"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Anytime />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/scheduled"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Scheduled />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/scheduled/list"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Scheduled />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/scheduled/timeline"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Scheduled />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/scheduled/calendar"
        element={(
          <ProtectedRoute role={USER_TYPES.EMPLOYEE}>
            <Scheduled />
          </ProtectedRoute>
        )}
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
      <CreateOrderModal />
      <EditOrderModal />
      <AddEmployeeModal />
      <EditEmployeeModal />
      <CompleteOrderModal />
      <DeleteOrderModal />
      <AssignOrderModal />
      <ScheduleOrderModal />
    </AuthProvider>
    <Notifications />
  </BrowserRouter>
);

export default App;
