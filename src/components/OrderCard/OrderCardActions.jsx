import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';

import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { deleteOrder } from '../../services/deleteOrder';
import { deleteOrderById } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';

import { Modal } from '../Modal';
import { Grid, GridEl } from '../Grid';
import { Button } from '../Button';
import { EditOrderForm } from '../OrderForm';
import { PopoverMenu } from '../PopoverMenu';

import styles from './OrderCard.module.scss';
import { updateOrder } from '../../services/updateOrder';

export const OrderCardActions = ({ order }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [isCompleteModalVisible, setIsCompleteModalVisible] = React.useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const navigate = useNavigate();
  const { pushNotification } = useNotification();

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visible) => !visible);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const handleDeleteOrder = React.useCallback(() => {
    setIsLoading(true);
    setIsDeleteModalVisible(false);

    deleteOrder(order._id)
      .then(() => {
        pushNotification({ theme: 'success', content: 'Measurement was successfully removed!' });
        dispatch(deleteOrderById(order._id));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' });
      });
  }, [dispatch, order, pushNotification]);

  const handleCompleteOrder = React.useCallback(() => {
    updateOrder(order._id, { status: 'completed' })
      .then(() => {
        pushNotification({ theme: 'success', content: 'Measurement completed!' });
        navigate('/completed');
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' });
      });
  }, [navigate, order._id, pushNotification]);

  const handleEditModalOpen = React.useCallback(() => {
    setIsEditModalVisible(true);
  }, []);

  const handleDeleteModalOpen = React.useCallback(() => {
    setIsDeleteModalVisible(true);
  }, []);

  const handleCompleteModalOpen = React.useCallback(() => {
    setIsCompleteModalVisible(true);
  }, []);

  const handleEditModalClose = React.useCallback(() => {
    setIsEditModalVisible(false);
  }, []);

  const handleDeleteModalClose = React.useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const handleCompleteModalClose = React.useCallback(() => {
    setIsCompleteModalVisible(false);
  }, []);

  const actions = [
    {
      label: 'Complete measurement',
      Icon: DoneIcon,
      handler: handleCompleteModalOpen,
    },
    ...(!isEmployee ? [
      {
        label: 'Edit measurement',
        Icon: EditIcon,
        handler: handleEditModalOpen,
      },
      {
        label: 'Delete measurement',
        Icon: TrashIcon,
        theme: 'danger',
        handler: handleDeleteModalOpen,
      },
    ] : []),
  ];

  return (
    <div className={cx(styles.actions, { [styles.active]: isPopoverVisible })}>
      <PopoverMenu
        visible={isPopoverVisible}
        items={actions}
        onVisibleChange={hidePopover}
      >
        <button type="button" className={styles.actionsButton} onClick={togglePopover}>
          <DotsIcon />
        </button>
      </PopoverMenu>
      <Modal
        isOpen={isEditModalVisible}
        size="medium"
        title="Edit measurement"
        onClose={handleEditModalClose}
      >
        <EditOrderForm values={order} onSuccess={handleEditModalClose} />
      </Modal>
      <Modal
        isOpen={isDeleteModalVisible}
        title="Are you sure you want to delete this measurement"
        onClose={handleDeleteModalClose}
      >
        <Grid>
          <GridEl size="auto">
            <Button disabled={isLoading} size="medium" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
          </GridEl>
          <GridEl size="auto">
            <Button isLoading={isLoading} size="medium" theme="danger" onClick={handleDeleteOrder}>
              Delete measurement
            </Button>
          </GridEl>
        </Grid>
      </Modal>
      <Modal
        isOpen={isCompleteModalVisible}
        title="Are you sure you want to complete this measurement"
        onClose={handleCompleteModalClose}
      >
        <Grid>
          <GridEl size="auto">
            <Button disabled={isLoading} size="medium" onClick={handleCompleteModalClose}>
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
    </div>
  );
};
