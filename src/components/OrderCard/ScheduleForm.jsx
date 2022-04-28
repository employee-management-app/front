import React from 'react';

import { useForm } from '../../hooks/useForm';
import { Field } from '../Field';
import { Input } from '../Input';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import axios from 'axios';

const getConfig = (yup) => ({
  schedule: {
    value: null,
    validation: yup.date().nullable().required(),
  },
});

export const ScheduleForm = ({ orderId }) => {
  const { 
    fields,
    errors,
    isValid,
    isLoading,
    setErrors,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_API_URL}/order-status-update/${orderId}`, { ...fields })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form 
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid space={SPACES.XL}>
        <GridEl size="12">
          <Field error={errors.schedule}>
            <Input 
              value={fields.schedule}
              type="datetime-local"
              onChange={(e) => onFieldChange(e, 'schedule')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>Confirm</Button>
        </GridEl>
      </Grid>
    </form>
  );
};
