import cx from 'classnames';

import styles from './Text.module.scss';

export const Text = ({ size = 'base', center, bold, italic, children }) => {
  const classNames = cx({
    [styles[size]]: size,
    [styles.center]: center,
    [styles.bold]: bold,
    [styles.italic]: italic,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
