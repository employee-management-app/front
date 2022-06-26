import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, fields, { withCredentials: true })
      .then(({ data, ...rest }) => {
        console.log(rest);
        const { role, ...userInfo } = data;

        const auth = {
          isLoggedIn: true,
          ...(role === 'manager' && { isManager: true }),
          ...(role === 'employee' && { isEmployee: true }),
          user: userInfo,
        };

        setAuth(auth);
        resolve(auth);
        window.localStorage.setItem('auth', JSON.stringify(auth));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signout`, {}, { withCredentials: true })
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
