import cx from 'classnames';

import styles from './Text.module.scss';

export const Text = ({ size = 'base', bold, italic, children }) => {
  const classNames = cx({
    [styles[size]]: size,
    [styles.bold]: bold,
    [styles.italic]: italic,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
