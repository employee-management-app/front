import React from 'react';
import { useSelector } from 'react-redux';

import { getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { DuplicateOrderForm } from '../OrderForm';

export const DuplicateOrderModal = () => {
  const { isVisible, hideModal } = useModalVisibility('DuplicateOrder');
  const order = useSelector(getOrder);

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Duplicate task"
      onClose={hideModal}
    >
      <DuplicateOrderForm values={order} onSuccess={hideModal} />
    </Modal>
  );
};
