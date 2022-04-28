import cx from 'classnames';
import React from 'react';

import styles from './Select.module.scss';

export const Select = ({ options = [], ...props }) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const onChange = (e) => {
    setValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div 
      className={cx(styles.field, { 
        [styles.invalid]: props.invalid, 
        [styles[props.size]]: props.size,
      })}
    >
      <select
        value={value}
        disabled={props.disabled}
        required={props.required}
        className={cx(styles.select, { [styles.active]: !!value })}
        onChange={onChange}
      >
        <option disabled hidden value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span className={styles.placeholder}>{props.placeholder}</span>
    </div>
  );
};