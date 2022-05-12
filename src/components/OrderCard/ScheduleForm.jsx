import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { updateOrder } from '../../services/updateOrder';
import { updateOrder as updateOrderInStore } from '../../store';

import { Field } from '../Field';
import { Input } from '../Input';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';

const getConfig = (yup) => ({
  schedule: {
    value: null,
    validation: yup.date().nullable().required(),
  },
});

export const ScheduleForm = ({ order, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isManager } = useAuth();
  const { pushNotification } = useNotification();

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

    updateOrder({ ...order, schedule: fields.schedule })
      .then((data) => {
        if (isManager) {
          dispatch(updateOrderInStore(data));
        } else {
          navigate('/scheduled');
        }

        pushNotification({ theme: 'success', content: 'Scheduled time successfully set!' });
        onSuccess();
      })
      .catch((err) => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
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
