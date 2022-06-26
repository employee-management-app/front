import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { deleteOrder } from '../../services/deleteOrder';
import { deleteOrderById } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { Grid, GridEl } from '../Grid';
import { Button } from '../Button';
import { EditOrderForm } from '../OrderForm';

import styles from './OrderCard.module.scss';

export const OrderCardActions = (props) => {
  const ref = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { pushNotification } = useNotification();

  const toggleDropdown = React.useCallback(() => {
    setIsDropdownVisible(visible => !visible);
  }, []);

  const hideDropdown = React.useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handleEditModalOpen = React.useCallback(() => {
    hideDropdown();
    setIsEditModalVisible(true);
  }, [hideDropdown]);

  const handleDeleteOrder = React.useCallback(() => {
    setIsLoading(true);
    setIsDeleteModalVisible(false);

    deleteOrder(props.order._id)
      .then(() => {
        pushNotification({ theme: 'success', content: 'Measurement was successfully removed!' })
        dispatch(deleteOrderById(props.order._id));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' })
      });
  }, [dispatch, props.order, pushNotification]);

  const handleDeleteModalOpen = React.useCallback(() => {
    hideDropdown();
    setIsDeleteModalVisible(true);
  }, [hideDropdown]);

  const handleEditModalClose = React.useCallback(() => {
    setIsEditModalVisible(false);
  }, []);

  const handleDeleteModalClose = React.useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  useClickOutside(ref, hideDropdown);

  return (
    <div className={cx(styles.actions, { [styles.active]: isDropdownVisible })} ref={ref}>
      <button type="button" className={styles.actionsButton} onClick={toggleDropdown}>
        <DotsIcon />
      </button>
      {isDropdownVisible && (
        <div className={styles.actionsDropdown}>
          <ul>
            <li>
              <button type="button" className={styles.action} onClick={handleEditModalOpen}>
                <EditIcon />
                Edit measurement
              </button>
            </li>
            <li>
              <button type="button" className={styles.action} onClick={handleDeleteModalOpen}>
                <TrashIcon />
                Delete measurement
              </button>
            </li>
          </ul>
        </div>
      )}
      <Modal
        isOpen={isEditModalVisible}
        size="medium"
        title="Edit measurement"
        onClose={handleEditModalClose}
      >
        <EditOrderForm values={props.order} onSuccess={handleEditModalClose} />
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
    </div>
  );
};
