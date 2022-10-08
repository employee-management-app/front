import React from 'react';
import cx from 'classnames';

import styles from './Text.module.scss';

export const Text = ({ size = 'base', center, fontWeight, italic, children }) => {
  const sizes = typeof size === 'object' ? size : { xs: size };

  const sizeClassNames = size
    ? Object.keys(sizes).map((key) => styles[`${key}${sizes[key]}`])
    : [];

  const classNames = cx(sizeClassNames, {
    [styles.center]: center,
    [styles[`fontWeight${fontWeight}`]]: fontWeight,
    [styles.italic]: italic,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
