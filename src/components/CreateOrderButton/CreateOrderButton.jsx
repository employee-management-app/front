import cx from 'classnames';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';

import styles from './CreateOrderButton.module.scss';

export const CreateOrderButton = () => {
  const { isManager } = useAuth();
  const { showDrawer, isVisible } = useDrawerVisibility('CreateOrder');

  if (!isManager) {
    return null;
  }

  return (
    <button type="button" className={cx(styles.button, { [styles.hidden]: isVisible })} onClick={showDrawer}>
      <PlusIcon />
    </button>
  );
};
