import cx from 'classnames';
import React from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useAuth } from '../../hooks/useAuth';

import { ReactComponent as VeryLowPriorityIcon } from '../../assets/icons/priorities/very-low.svg';
import { ReactComponent as LowPriorityIcon } from '../../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../../assets/icons/priorities/high.svg';
import { ReactComponent as VeryHighPriorityIcon } from '../../assets/icons/priorities/very-high.svg';

import styles from './OrderCard.module.scss';

const icons = {
  'very-low': VeryLowPriorityIcon,
  'low': LowPriorityIcon,
  'normal': NormalPriorityIcon,
  'high': HighPriorityIcon,
  'very-high': VeryHighPriorityIcon,
};

const labels = {
  'very-low': 'Very low',
  'low': 'Low',
  'normal': 'Normal',
  'high': 'High',
  'very-high': 'Very high',
};

export const OrderCardPriority = React.forwardRef((props, ref) => {
  const defaultPriority = Object.keys(labels).includes(props.priority) ? props.priority : 'normal';

  const [priority, setPriority] = React.useState(defaultPriority);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const { isManager } = useAuth();

  const handleClick = React.useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const hideDropdown = React.useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handlePriorityClick = React.useCallback((key) => () => {
    hideDropdown();
    setPriority(key);
    props.onChange(key);
  }, [props, hideDropdown]);

  useClickOutside(ref, hideDropdown);

  const getIconByKey = (key = 'normal') => {
    const IconByKey = icons[key];

    return <IconByKey />;
  }

  return (
    <span ref={ref} style={{ position: 'relative' }}>
      <button 
        type="button" 
        className={cx(styles.priority, styles[priority])}
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
                className={cx(styles.priority, styles[key], { [styles.selected]: priority === key })} 
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
});
