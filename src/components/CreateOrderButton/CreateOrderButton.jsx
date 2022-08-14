import React from 'react';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

import { Modal } from '../Modal';
import { CreateOrderForm } from '../OrderForm';

import styles from './CreateOrderButton.module.scss';

export const CreateOrderButton = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button type="button" className={styles.button} onClick={handleClick}>
        <PlusIcon />
      </button>
      <Modal
        isOpen={isModalOpen}
        size="medium"
        title="Create new measurement"
        onClose={handleModalClose}
      >
        <CreateOrderForm onSuccess={handleModalClose} />
      </Modal>
    </>
  );
};
