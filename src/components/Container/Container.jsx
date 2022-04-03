import cx from 'classnames';

import styles from './Container.module.scss';

export const Container = ({ children, className }) => {
  return (
    <div className={cx(styles.container, className)}>
      {children}
    </div>
  )
};
