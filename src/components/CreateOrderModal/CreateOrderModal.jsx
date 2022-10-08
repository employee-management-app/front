import React from 'react';

import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { CreateOrderForm } from '../OrderForm';

export const CreateOrderModal = () => {
  const { isVisible, hideModal } = useModalVisibility('CreateOrder');

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Create new measurement"
      onClose={hideModal}
    >
      <CreateOrderForm onSuccess={hideModal} />
    </Modal>
  );
};
