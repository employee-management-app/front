import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { updateOrder } from '../../services/updateOrder';

import { setOrder, updateOrder as updateOrderInStore } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const EditOrderForm = ({ values, onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { hideDrawer } = useDrawerVisibility('EditOrder');
  const {
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setFields,
    setErrors,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => getOrderFormConfig(yup, values));

  React.useEffect(() => {
    const config = getOrderFormConfig(null, values);
    const defaultFields = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].value }), {});

    setFields(defaultFields);
    setErrors({});
  }, [values]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      onSuccess?.();
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

    updateOrder(values._id, payload)
      .then((data) => {
        onSuccess?.();
        dispatch(updateOrderInStore(data));
        dispatch(setOrder(data));
        pushNotification({ theme: 'success', content: 'Task was successfully updated!' });
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        const action = !!error.response?.data.value && {
          to: `/orders/${error.response?.data.value}`,
          onClick: hideDrawer,
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
      editMode
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      submitLabel="Save changes"
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
