import cx from 'classnames';

import styles from './Container.module.scss';

export const Container = ({ children, className, fullScreen }) => {
  return (
    <div className={cx(styles.container, className, { [styles.fullScreen]: fullScreen })}>
      {children}
    </div>
  )
};
