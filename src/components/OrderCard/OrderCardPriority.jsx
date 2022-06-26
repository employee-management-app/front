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

import styles from './OrderCard.module.scss';

const icons = {
  0: LowPriorityIcon,
  1: NormalPriorityIcon,
  2: HighPriorityIcon,
  3: VeryHighPriorityIcon,
};

const labels = {
  0: 'Low',
  1: 'Normal',
  2: 'High',
  3: 'Very high',
};

export const OrderCardPriority = (props) => {
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

    updateOrder(props.id, { priority: key })
      .then((data) => {
        dispatch(updateOrderInStore(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
      });
  }, [hideDropdown, props.id, dispatch, pushNotification]);

  useClickOutside(ref, hideDropdown);

  const getIconByKey = (key) => {
    const IconByKey = icons[key];

    return <IconByKey />;
  }

  return (
    <span ref={ref} style={{ position: 'relative' }}>
      <button 
        type="button" 
        className={cx(styles.priority, styles[`priority-${priority}`])}
        disabled={!isManager} 
        onClick={handleClick}
      >
        {labels[priority]}
        {getIconByKey(priority)}
      </button>
      {isDropdownVisible && (
        <div className={styles.priorityDropdown}>
          <ul>
            {Object.keys(labels).map((key) => (
              <li 
                key={key} 
                className={cx(styles.priority, styles[`priority-${key}`], { [styles.selected]: priority === Number(key) })} 
                onClick={handlePriorityClick(key)}
              >
                {labels[key]}
                {getIconByKey(key)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};
