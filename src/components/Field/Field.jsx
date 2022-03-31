import React from 'react';

import styles from './Field.module.scss';

export const Field = ({ children, label, error }) => (
  <>
    {label && <span className={styles.label}>{label}</span>}
    {React.cloneElement(children, { invalid: error })}
    {error && <span className={styles.error}>{error}</span>}
  </>
);
