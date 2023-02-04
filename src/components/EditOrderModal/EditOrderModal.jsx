import React from 'react';
import { useSelector } from 'react-redux';

import { getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { EditOrderForm } from '../OrderForm';

export const EditOrderModal = () => {
  const { isVisible, hideModal } = useModalVisibility('EditOrder');
  const order = useSelector(getOrder);

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Edit task"
      onClose={hideModal}
    >
      <EditOrderForm values={order} onSuccess={hideModal} />
    </Modal>
  );
};
