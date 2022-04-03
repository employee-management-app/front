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
    const getFakeAuth = (userType) => ({
      token: 'token',
      isLoggedIn: true,
      ...(userType === 'manager' && { isManager: true }),
      ...(userType === 'worker' && { isWorker: true }),
      user: {
        email: userType === 'manager' ? 'manager@perfecta.com' : 'worker@gmail.com',
        name: userType === 'manager' ? 'Manager' : 'Worker',
        surname: userType === 'manager' ? 'Perfecta' : 'Kowalski',
      },
    });

    setTimeout(() => {
      if (email === 'manager@perfecta.com' || email === 'worker@gmail.com') {
        if (password === 'nie mam pojecia') {
          const userType = email === 'manager@perfecta.com' ? 'manager' : 'worker';

          setAuth(getFakeAuth(userType));
          resolve(getFakeAuth(userType));
          window.localStorage.setItem('auth', JSON.stringify(getFakeAuth(userType)));
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
    USER_TYPES: {
      MANAGER: 'MANAGER',
      WORKER: 'WORKER',
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
