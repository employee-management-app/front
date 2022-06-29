import React from 'react';

import { formatDateToDateTimeLocal } from '../../utils/formatDateToDateTimeLocal';

import { Input } from '../Input';

const min = formatDateToDateTimeLocal(Date.now());

export const DatePicker = (props) => {
  return (
    <Input 
      {...props}
      min={min}
      type="datetime-local"
    />
  );
};
