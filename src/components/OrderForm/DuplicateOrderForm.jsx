import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { createOrder } from '../../services/createOrder';

import { addOrder } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const DuplicateOrderForm = ({ values: { startDate, endDate, ...values }, onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { hideModal } = useModalVisibility('DuplicateOrder');
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => getOrderFormConfig(yup, values));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      pushNotification({ theme: 'warning', content: 'Please fill in all required fields!' });
      return;
    }

    setIsLoading(true);

    const payload = {
      ...fields,
      address: {
        fullAddress: fields.fullAddress,
        code: fields.code,
        city: fields.city,
        street: fields.street,
        house: fields.house,
        flat: fields.flat,
        lat: fields.lat,
        lng: fields.lng,
      },
    };

    createOrder(payload)
      .then((data) => {
        onSuccess?.();
        dispatch(addOrder(data));

        const action = {
          to: `/orders/${data._id}`,
          label: 'Open task',
        };

        pushNotification({ theme: 'success', content: 'Task was successfully duplicated!', action });
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        const action = !!error.response?.data.value && {
          to: `/orders/${error.response?.data.value}`,
          onClick: hideModal,
          label: 'Open task',
        };

        pushNotification({ theme: 'error', content, action });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <OrderForm
      editMode
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      submitLabel="Duplicate task"
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
