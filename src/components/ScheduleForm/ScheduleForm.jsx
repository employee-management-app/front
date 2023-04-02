import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { updateOrder } from '../../services/updateOrder';
import { setOrder, updateOrder as updateOrderInStore } from '../../store';

import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import { DateTimePicker } from '../DateTimePicker';

export const ScheduleForm = ({ order, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isManager } = useAuth();
  const { hideModal } = useModalVisibility('ScheduleOrder');
  const { pushNotification } = useNotification();

  const getConfig = () => ({
    startDate: {
      value: order.startDate,
    },
    endDate: {
      value: order.endDate,
    },
  });

  const {
    fields,
    isTouched,
    isLoading,
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

    if (!isTouched) {
      onSuccess();

      return;
    }

    setIsLoading(true);

    updateOrder(order._id, fields)
      .then((data) => {
        if (isManager) {
          dispatch(updateOrderInStore(data));
          dispatch(setOrder(data));
        } else {
          navigate(data.startDate ? '/scheduled' : '/anytime');
        }

        pushNotification({
          theme: 'success',
          content: `Scheduled time successfully ${data.startDate ? 'set' : 'removed'}!`,
        });
        onSuccess();
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        const action = !!error.response?.data.value && {
          to: `/orders/${error.response?.data.value}`,
          onClick: hideModal,
          label: 'See order',
        };

        pushNotification({ theme: 'error', content, action });
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
          <DateTimePicker
            value={[fields.startDate, fields.endDate]}
            placeholder="Schedule time"
            size="medium"
            rangeMode="time"
            onChange={handleChange}
          />
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>Confirm</Button>
        </GridEl>
      </Grid>
    </form>
  );
};
