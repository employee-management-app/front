import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateOrder } from '../../services/updateOrder';
import { getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { Grid, GridEl } from '../Grid';
import { Button } from '../Button';

export const CompleteOrderModal = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const order = useSelector(getOrder);
  const { isVisible, hideModal } = useModalVisibility('CompleteOrder');
  const { pushNotification } = useNotification();

  const handleCompleteOrder = React.useCallback(() => {
    setIsLoading(true);

    updateOrder(order._id, { status: 'completed' })
      .then(() => {
        pushNotification({ theme: 'success', content: 'Measurement completed!' });
        navigate('/completed');
        hideModal();
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' });
      });
  }, [hideModal, navigate, order?._id, pushNotification]);

  return (
    <Modal
      isOpen={isVisible}
      title="Are you sure you want to complete this measurement"
      onClose={hideModal}
    >
      <Grid>
        <GridEl size="auto">
          <Button disabled={isLoading} size="medium" onClick={hideModal}>
            Cancel
          </Button>
        </GridEl>
        <GridEl size="auto">
          <Button isLoading={isLoading} size="medium" theme="success" onClick={handleCompleteOrder}>
            Complete measurement
          </Button>
        </GridEl>
      </Grid>
    </Modal>
  );
};
