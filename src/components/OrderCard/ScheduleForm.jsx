import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { formatDateToDateTimeLocal } from '../../utils/formatDateToDateTimeLocal';
import { updateOrder } from '../../services/updateOrder';
import { updateOrder as updateOrderInStore } from '../../store';

import { Field } from '../Field';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import { DateTimePicker } from '../DateTimePicker';

export const ScheduleForm = ({ order, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isManager } = useAuth();
  const { pushNotification } = useNotification();

  const getConfig = () => ({
    startDate: {
      value: formatDateToDateTimeLocal(order.startDate),
    },
    endDate: {
      value: formatDateToDateTimeLocal(order.endDate),
    },
  });

  const {
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setErrors,
    setIsLoading,
    onValueChange,
    onSubmit,
  } = useForm(getConfig);

  const handleChange = React.useCallback(([startDate, endDate]) => {
    onValueChange(startDate, 'startDate');
    onValueChange(endDate, 'endDate');
  }, [onValueChange]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    if (isValid && !isTouched) {
      onSuccess();

      return;
    }

    setIsLoading(true);

    updateOrder(order._id, fields)
      .then((data) => {
        if (isManager) {
          dispatch(updateOrderInStore(data));
        } else {
          navigate(data.startDate ? '/scheduled' : '/anytime');
        }

        pushNotification({
          theme: 'success',
          content: `Scheduled time successfully ${data.startDate ? 'set' : 'removed'}!`,
        });
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
          <Field error={errors.startDate || errors.endDate}>
            <DateTimePicker
              value={[fields.startDate, fields.endDate]}
              placeholder="Schedule time"
              size="medium"
              rangeMode="time"
              onChange={handleChange}
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
