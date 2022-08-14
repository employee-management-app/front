import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from './services/axios';

const authFromLocalStorage = JSON.parse(window.localStorage.getItem('auth'));

const defaultContextValue = {
  isLoggedIn: false,
  isManager: false,
  isEmployee: false,
  user: {},
};

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(authFromLocalStorage || defaultContextValue);

  const navigate = useNavigate();

  const handleLogin = (fields) => new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, fields)
      .then(({ data }) => {
        const { token, user } = data;

        const authData = {
          isLoggedIn: true,
          ...(user.role === 'manager' && { isManager: true }),
          ...(user.role === 'employee' && { isEmployee: true }),
          user,
          token,
        };

        setAuth(authData);
        resolve(authData);
        window.localStorage.setItem('auth', JSON.stringify(authData));
      })
      .catch((err) => {
        reject(err.response.data || {});
      });
  });

  const handleLogout = () => {
    setAuth(defaultContextValue);
    navigate('/login');
    window.localStorage.removeItem('auth');
  };

  const value = {
    ...auth,
    USER_TYPES: {
      MANAGER: 'MANAGER',
      EMPLOYEE: 'EMPLOYEE',
    },
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
