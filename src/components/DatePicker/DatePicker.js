import React from 'react';

import { Input } from '../Input';

export const DatePicker = (props) => {
  const [type, setType] = React.useState('text');

  const handleBlur = () => {
    setType('text');
  };

  const handleFocus = () => {
    setType('datetime-local');
  };

  return (
    <Input 
      {...props}
      type={props.value ? 'datetime-local' : type}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};
