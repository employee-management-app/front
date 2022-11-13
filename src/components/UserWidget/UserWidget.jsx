import React from 'react';

import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';

import { useAuth } from '../../hooks/useAuth';
import { PopoverMenu } from '../PopoverMenu';

import styles from './UserWidget.module.scss';

export const UserWidget = () => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const { isManager, user, onLogout } = useAuth();

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visibility) => !visibility);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const menu = [
    ...(isManager ? [{
      label: 'Employees',
      Icon: UsersIcon,
      to: '/employees',
    }] : []),
    {
      label: 'Log out',
      handler: onLogout,
      Icon: ExitIcon,
      theme: 'danger',
    },
  ];

  return (
    <PopoverMenu
      visible={isPopoverVisible}
      items={menu}
      onVisibleChange={hidePopover}
    >
      <button type="button" className={styles.user} onClick={togglePopover}>
        {user.name[0]}{user.surname[0]}
      </button>
    </PopoverMenu>
  );
};
