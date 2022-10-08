import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateOrder } from '../../services/updateOrder';
import { updateOrder as updateOrderInStore } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAuth } from '../../hooks/useAuth';

import { ReactComponent as LowPriorityIcon } from '../../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../../assets/icons/priorities/high.svg';
import { ReactComponent as VeryHighPriorityIcon } from '../../assets/icons/priorities/very-high.svg';

import styles from './OrderPriority.module.scss';

const icons = [
  LowPriorityIcon,
  NormalPriorityIcon,
  HighPriorityIcon,
  VeryHighPriorityIcon,
];

const labels = [
  'Low',
  'Normal',
  'High',
  'Very high',
];

export const OrderPriority = ({ id, disabled, ...props }) => {
  const ref = React.useRef();
  const [priority, setPriority] = React.useState(props.priority);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isManager } = useAuth();
  const { pushNotification } = useNotification();

  const handleClick = React.useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const hideDropdown = React.useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handlePriorityClick = React.useCallback((key) => () => {
    hideDropdown();
    setPriority(key);

    updateOrder(id, { priority: key })
      .then((data) => {
        dispatch(updateOrderInStore(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
      });
  }, [hideDropdown, id, dispatch, pushNotification]);

  useClickOutside(ref, hideDropdown);

  const getIconByIndex = (key) => {
    const IconByKey = icons[key];

    return <IconByKey />;
  };

  return (
    <span ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className={cx(styles.priority, styles[`priority-${priority}`])}
        disabled={!isManager || disabled}
        onClick={handleClick}
      >
        {labels[priority]}
        {getIconByIndex(priority)}
      </button>
      {isDropdownVisible && (
        <div className={styles.priorityDropdown}>
          <ul>
            {labels.map((label, index) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li
                key={label}
                className={cx(
                  styles.priority,
                  styles[`priority-${index}`],
                  { [styles.selected]: priority === index },
                )}
                onClick={handlePriorityClick(index)}
              >
                {label}
                {getIconByIndex(index)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};
