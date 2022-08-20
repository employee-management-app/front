import React from 'react';

import { useAuth } from '../../hooks/useAuth';
import { PopoverMenu } from '../PopoverMenu';

import styles from './UserWidget.module.scss';

export const UserWidget = () => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const { user, onLogout } = useAuth();

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visibility) => !visibility);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  return (
    <PopoverMenu
      visible={isPopoverVisible}
      items={[{
        label: 'Log out',
        handler: onLogout,
      }]}
      onVisibleChange={hidePopover}
    >
      <button type="button" className={styles.user} onClick={togglePopover}>
        {user.name[0]}{user.surname[0]}
      </button>
    </PopoverMenu>
  );
};
