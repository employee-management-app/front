import cx from 'classnames';

import styles from './Card.module.scss';

export const Card = ({ children, horizontal }) => {
  return (
    <div className={cx(styles.card, { [styles.horizontal]: horizontal })}>
      {children}
    </div>
  );
};
