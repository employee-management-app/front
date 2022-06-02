import cx from 'classnames';
import React from 'react';

import styles from './Textarea.module.scss';

export const Textarea = (props) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  }, [props]);

  return (
    <textarea 
      value={value}
      className={cx(styles.textarea, { [styles[props.size]]: props.size })} 
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  );
};
