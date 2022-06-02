import cx from 'classnames';

import styles from './Card.module.scss';

export const Card = ({ children, className, horizontal, onClick }) => {
  return (
    <div className={cx(styles.card, className, { [styles.horizontal]: horizontal })} onClick={onClick}>
      {children}
    </div>
  );
};
