import cx from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export const Input = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const classNames = cx(styles.field, { 
    [styles[props.size]]: props.size,
    [styles.invalid]: props.invalid,
  });

  return (
    <label className={classNames}>
      <input 
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={value}
        className={styles.input}
        onChange={onChange}
      />
      {props.icon && <props.icon />}
    </label>
  );
};
