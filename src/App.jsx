import React from 'react';
import { BrowserRouter, Routes, Route, Navigate }  from 'react-router-dom';

import { Header } from './components/Header';
import { Inbox } from './pages/inbox';
import { Login } from './pages/login';
import { Scheduler } from './pages/scheduler';
import { Completed } from './pages/completed';
import { Error } from './pages/error';
import { UI } from './pages/ui';
import { AuthProvider } from './AuthContext';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <Inbox />
                </ProtectedRoute>
              } 
            />
            <Route path='/login' element={<Login />} />
            <Route 
              path='/scheduler' 
              element={
                <ProtectedRoute>
                  <Scheduler />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/completed' 
              element={
                <ProtectedRoute>
                  <Completed />
                </ProtectedRoute>
              } 
            />
            <Route path='/ui' element={<UI />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
