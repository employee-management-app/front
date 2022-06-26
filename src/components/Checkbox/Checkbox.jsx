import React from 'react';
import cx from 'classnames';

import styles from './Checkbox.module.scss';

export const Checkbox = (props) => {
  const [isChecked, setIsChecked] = React.useState(props.checked || false);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  const onChange = React.useCallback((e) => {
    setIsChecked(e.target.checked);

    if (props.onChange) {
      props.onChange(e);
    }
  }, [props]);

  const classNames = cx(styles.field, { 
    [styles.checked]: isChecked,
    [styles.invalid]: props.invalid,
  });

  return (
    <label className={classNames}>
      <input 
        type="checkbox" 
        className={styles.input}
        onChange={onChange}
      />
      {props.children}
    </label>
  );
};
