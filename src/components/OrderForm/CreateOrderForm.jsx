import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
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
        code: fields.code,
        city: fields.city,
        street: fields.street,
        house: fields.house,
        flat: fields.flat,
      },
    };

    createOrder(payload)
      .then((data) => {
        if (onSuccess) {
          onSuccess();
        }

        dispatch(addOrder(data));
        pushNotification({ theme: 'success', content: 'Measurement was successfully created!' });
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Please double check entired data.' });
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
