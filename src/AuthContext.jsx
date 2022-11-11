/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from './services/axios';

const authFromLocalStorage = JSON.parse(window.localStorage.getItem('auth'));

const defaultContextValue = {
  isLoggedIn: true,
  isManager: true,
  user: {
    _id: '62b8618c6574420dc96db467',
    name: 'Manager',
    surname: 'Perfecta',
    phone: '+48265386932',
    email: 'manager@perfecta.com',
    password: '$2a$08$bYLH6heGns7eC6LPtVys4utdc6Z9bOc9/2inj0Yi3Bauo09BHimdy',
    role: 'manager',
    isVerified: true,
    isActive: true,
    registrationDate: '2022-06-26T13:36:19.185Z',
    __v: 0,
  },
  // eslint-disable-next-line max-len
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjg2MThjNjU3NDQyMGRjOTZkYjQ2NyIsImlhdCI6MTY2ODE4NjAzNH0.RHye3YH1BhrZrFmbghKxP4oS5wki2mRtZacAK6XVtO8',
};

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(defaultContextValue);

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
