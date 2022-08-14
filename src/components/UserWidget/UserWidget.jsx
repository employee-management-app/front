import React from 'react';

import { useAuth } from '../../hooks/useAuth';

import styles from './UserWidget.module.scss';

export const UserWidget = () => {
  const { user, onLogout } = useAuth();

  return (
    <span className={styles.widget}>
      <button type="button" className={styles.user}>
        {user.name[0]}{user.surname[0]}
      </button>
      <div className={styles.dropdown}>
        <div className={styles.dropdownInner}>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </span>
  );
};
