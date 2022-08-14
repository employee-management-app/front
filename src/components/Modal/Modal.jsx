import cx from 'classnames';
import React from 'react';
import ReactModal from 'react-modal';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import styles from './Modal.module.scss';

export const Modal = ({ onClose, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);

    if (onClose) onClose();
  }, [onClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      className={cx(styles.modal, { [styles.center]: props.center })}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
      onRequestClose={closeModal}
    >
      {props.title && <div className={styles.title}>{props.title}</div>}
      {props.children}
      <button
        type="button"
        className={styles.closeButton}
        onClick={closeModal}
      >
        <CloseIcon />
      </button>
    </ReactModal>
  );
};
