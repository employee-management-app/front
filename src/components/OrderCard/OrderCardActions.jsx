import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';

import { useClickOutside } from '../../hooks/useClickOutside';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { deleteOrder } from '../../services/deleteOrder';
import { deleteOrderById } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';

import { Modal } from '../Modal';
import { Grid, GridEl } from '../Grid';
import { Button } from '../Button';
import { EditOrderForm } from '../OrderForm';

import styles from './OrderCard.module.scss';
import { updateOrder } from '../../services/updateOrder';

export const OrderCardActions = ({ order }) => {
  const ref = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [isCompleteModalVisible, setIsCompleteModalVisible] = React.useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const navigate = useNavigate();
  const { pushNotification } = useNotification();

  const toggleDropdown = React.useCallback(() => {
    setIsDropdownVisible((visible) => !visible);
  }, []);

  const hideDropdown = React.useCallback(() => {
    setIsDropdownVisible(false);
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
  }, []);

  const handleEditModalOpen = React.useCallback(() => {
    hideDropdown();
    setIsEditModalVisible(true);
  }, [hideDropdown]);

  const handleDeleteModalOpen = React.useCallback(() => {
    hideDropdown();
    setIsDeleteModalVisible(true);
  }, [hideDropdown]);

  const handleCompleteModalOpen = React.useCallback(() => {
    hideDropdown();
    setIsCompleteModalVisible(true);
  }, [hideDropdown]);

  const handleEditModalClose = React.useCallback(() => {
    setIsEditModalVisible(false);
  }, []);

  const handleDeleteModalClose = React.useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const handleCompleteModalClose = React.useCallback(() => {
    setIsCompleteModalVisible(false);
  }, []);

  useClickOutside(ref, hideDropdown);

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
        handler: handleDeleteModalOpen,
      },
    ] : []),
  ];

  return (
    <div className={cx(styles.actions, { [styles.active]: isDropdownVisible })} ref={ref}>
      <button type="button" className={styles.actionsButton} onClick={toggleDropdown}>
        <DotsIcon />
      </button>
      {isDropdownVisible && (
        <div className={styles.actionsDropdown}>
          <ul>
            {actions.map(({ label, Icon, handler }) => (
              <li key={label}>
                <button type="button" className={styles.action} onClick={handler}>
                  <Icon />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
