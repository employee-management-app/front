import { useAuth } from '../../hooks/useAuth';

import styles from './UserWidget.module.scss';

export const UserWidget = () => {
  const { user } = useAuth();

  return (
    <button type="button" className={styles.user}>
      {user.name[0]}{user.surname[0]}
    </button>
  )
};
