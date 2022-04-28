import cx from 'classnames';
import React from 'react';

import styles from './Field.module.scss';

export const Field = ({ children, label, error }) => (
  <>
    {label && <span className={cx(styles.label, { [styles.error]: error })}>{label}</span>}
    {children && React.cloneElement(children, { invalid: error })}
    {error && <span className={styles.error}>{error}</span>}
  </>
);
