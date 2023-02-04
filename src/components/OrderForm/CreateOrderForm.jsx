import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { createOrder } from '../../services/createOrder';

import { addOrder } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const CreateOrderForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm(getOrderFormConfig);
  const { hideModal } = useModalVisibility('CreateOrder');

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
        pushNotification({ theme: 'success', content: 'Task was successfully created!' });
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
    <OrderForm
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
