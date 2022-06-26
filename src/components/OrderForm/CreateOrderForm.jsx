import React from 'react';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { createOrder } from '../../services/createOrder';

import { useDispatch } from 'react-redux';
import { addOrder } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const CreateOrderForm = (props) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { 
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
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
        if (props.onSuccess) {
          props.onSuccess();
        }

        dispatch(addOrder(data));
        pushNotification({ theme: 'success', content: 'Measurement was successfully created!' });
      })
      .catch((err) => {
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
      onSubmit={handleSubmit}
    />
  );
};
