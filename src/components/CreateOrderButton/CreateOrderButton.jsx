import React from 'react';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';

import styles from './CreateOrderButton.module.scss';

export const CreateOrderButton = () => {
  const { showModal } = useModalVisibility('CreateOrder');

  return (
    <button type="button" className={styles.button} onClick={showModal}>
      <PlusIcon />
    </button>
  );
};
