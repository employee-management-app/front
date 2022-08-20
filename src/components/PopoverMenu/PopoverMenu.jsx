import React from 'react';
import cx from 'classnames';

import { Popover } from '../Popover';

import styles from './PopoverMenu.module.scss';

export const PopoverMenu = ({ items, visible, children, onVisibleChange }) => {
  const handleClick = React.useCallback((handler) => () => {
    onVisibleChange(false);
    handler();
  }, [onVisibleChange]);

  return (
    <Popover
      visible={visible}
      className={styles.popover}
      placement="bottom-right"
      content={(
        <ul className={styles.list}>
          {items.map(({ label, Icon, handler, theme }) => (
            <li key={label} className={styles.item}>
              <button
                type="button"
                className={cx(styles.button, { [styles[theme]]: theme })}
                onClick={handleClick(handler)}
              >
                {Icon && <Icon />}
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Popover>
  );
};
