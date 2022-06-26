import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { updateOrder } from '../../services/updateOrder';
import { getEmployees, updateOrder as updateOrderInStore } from '../../store';

import { Field } from '../Field';
import { Select } from '../Select';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';

export const AssignForm = ({ order, onSuccess }) => {  
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);

  const getConfig = (yup) => ({
    assignedEmployee: {
      value: order.assignedEmployee ? order.assignedEmployee._id : null,
      validation: yup.string().nullable(),
    },
  });

  const { pushNotification } = useNotification();
  const { 
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setErrors,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const employeesOptions = React.useMemo(() => (
    employees.map(({ _id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: _id,
    }))
  ), [employees]);

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
        pushNotification({ 
          theme: 'success', 
          content: data.assignedEmployee 
            ? `${data.assignedEmployee.name} ${data.assignedEmployee.surname} was successfully assigned to this measurement!`
            : `${order.assignedEmployee.name} ${order.assignedEmployee.surname} was successfully removed from this measurement!`
        });

        dispatch(updateOrderInStore(data));
        onSuccess();
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
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
          <Field error={errors.assignedEmployee}>
            <Select 
              value={fields.assignedEmployee}
              size="medium"
              placeholder="Select employee" 
              options={employeesOptions}
              onClear={(val) => onValueChange(val, 'assignedEmployee')}
              onChange={(e) => onFieldChange(e, 'assignedEmployee')}
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
