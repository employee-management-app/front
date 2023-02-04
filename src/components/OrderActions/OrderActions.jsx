import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { setOrder } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { useModalVisibility } from '../../hooks/useModalVisibility';

import { PopoverMenu } from '../PopoverMenu';

import styles from './OrderActions.module.scss';

export const OrderActions = ({ order, className }) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const { showModal: showEditModal } = useModalVisibility('EditOrder');
  const { showModal: showDeleteModal } = useModalVisibility('DeleteOrder');
  const { showModal: showCompleteModal } = useModalVisibility('CompleteOrder');

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visible) => !visible);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const handleEditModalOpen = React.useCallback(() => {
    dispatch(setOrder(order));
    showEditModal();
  }, [dispatch, order, showEditModal]);

  const handleDeleteModalOpen = React.useCallback(() => {
    dispatch(setOrder(order));
    showDeleteModal();
  }, [dispatch, order, showDeleteModal]);

  const handleCompleteModalOpen = React.useCallback(() => {
    dispatch(setOrder(order));
    showCompleteModal();
  }, [dispatch, order, showCompleteModal]);

  const actions = [
    {
      label: 'Complete task',
      Icon: DoneIcon,
      handler: handleCompleteModalOpen,
    },
    ...(!isEmployee ? [
      {
        label: 'Edit task',
        Icon: EditIcon,
        handler: handleEditModalOpen,
      },
      {
        label: 'Remove task',
        Icon: TrashIcon,
        theme: 'danger',
        handler: handleDeleteModalOpen,
      },
    ] : []),
  ];

  return (
    <div className={cx(styles.actions, className, { active: isPopoverVisible })}>
      <PopoverMenu
        visible={isPopoverVisible}
        items={actions}
        onVisibleChange={hidePopover}
      >
        <button type="button" className={styles.actionsButton} onClick={togglePopover}>
          <DotsIcon />
        </button>
      </PopoverMenu>
    </div>
  );
};
