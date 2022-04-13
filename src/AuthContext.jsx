import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const authFromLocalStorage = JSON.parse(window.localStorage.getItem('auth'));

const defaultContextValue = {
  token: '',
  isLoggedIn: false,
  user: {},    
};

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(authFromLocalStorage || defaultContextValue);

  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, { username: email, password })
      .then(({ data }) => {
        const { isManager, ...userInfo } = data.userInfo;

        const auth = {
          token: data.token,
          isLoggedIn: true,
          ...(isManager && { isManager: true }),
          ...(!isManager && { isEmployee: true }),
          user: userInfo,
        };

        setAuth(auth);
        resolve(auth);
        window.localStorage.setItem('auth', auth);
      })
      .catch((err) => {
        const errorMessage = err.response.data.non_field_errors[0];
        reject({ email: errorMessage, password: errorMessage });
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
