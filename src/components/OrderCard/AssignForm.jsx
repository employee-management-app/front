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

const getConfig = (yup) => ({
  employee: {
    value: null,
    validation: yup.number().nullable().required(),
  },
});

export const AssignForm = ({ order, onSuccess }) => {  
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);

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

  const employeesOptions = React.useMemo(() => (
    employees.map(({ id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: id,
    }))
  ), [employees]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    updateOrder({ ...order, assigned: fields.employee })
      .then((data) => {
        dispatch(updateOrderInStore(data));
        pushNotification({ theme: 'success', content: `${data.assigned.name} ${data.assigned.surname} was successfully assigned to this measurement!` });
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
          <Field error={errors.employee}>
            <Select 
              value={fields.employee}
              size="medium"
              placeholder="Select employee" 
              options={employeesOptions}
              onChange={(e) => onFieldChange(e, 'employee')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>Assign</Button>
        </GridEl>
      </Grid>
    </form>
  );
};
