import { Navigate } from 'react-router-dom';

import { SignupForm } from '../components/SignupForm';
import { useAuth } from '../hooks/useAuth';

export const Signup = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <SignupForm />;
};
