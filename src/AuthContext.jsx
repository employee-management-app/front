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
    // TODO: real axios request instead of checking and sending static data
    // Set real error message from back
    const fakeAuth = {
      token: 'token',
      isLoggedIn: true,
      user: {
        email: 'admin@perfecta.com',
        name: 'Jan',
        surname: 'Kowalski',
      }, 
    };

    setTimeout(() => {
      if (email === 'admin@perfecta.com') {
        if (password === 'nie mam pojecia') {
          setAuth(fakeAuth);
          resolve(fakeAuth);
          window.localStorage.setItem('auth', JSON.stringify(fakeAuth));
        } else {
          reject({ password: 'Password is incorrect' });
        }
      } else {
        reject({ email: 'This account is not registrated' });
      }
    }, 1000);
  });

  const handleLogout = () => {
    setAuth(defaultContextValue);
    navigate('/login');
    window.localStorage.removeItem('auth');
  };

  const value = {
    ...auth,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
