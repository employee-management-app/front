import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { updateOrder } from '../../services/updateOrder';

import { setOrder, updateOrder as updateOrderInStore } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const EditOrderForm = ({ values, onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const {
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => getOrderFormConfig(yup, values));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      if (onSuccess) {
        onSuccess();
      }

      return;
    }

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

    updateOrder(values._id, payload)
      .then((data) => {
        if (onSuccess) {
          onSuccess();
        }

        dispatch(updateOrderInStore(data));
        dispatch(setOrder(data));
        pushNotification({ theme: 'success', content: 'Measurement was successfully updated!' });
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
      editMode
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
