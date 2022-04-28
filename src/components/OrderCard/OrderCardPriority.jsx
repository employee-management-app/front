import cx from 'classnames';
import React from 'react';

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

export const OrderCardPriority = (props) => {
  const priority = Object.keys(labels).includes(props.priority) ? props.priority : 'normal';
  const Icon = icons[priority || 'normal'];

  return (
    <div className={cx(styles.priority, styles[priority])}>
      {labels[priority]}
      {Object.keys(icons).includes(priority) && <Icon />}
    </div>
  );
};
