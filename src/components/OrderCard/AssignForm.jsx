import React from 'react';

import { useForm } from '../../hooks/useForm';
import { fetchEmployees } from '../../services/fetchEmployees';
import { updateOrder } from '../../services/updateOrder';
import { Field } from '../Field';
import { Select } from '../Select';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';

const getConfig = (yup) => ({
  employee: {
    value: '',
    validation: yup.string().required(),
  },
});

export const AssignForm = ({ order }) => {  
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

  React.useEffect(() => {
    fetchEmployees()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    updateOrder({ ...order, assigned: fields.employee })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
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
              options={[
                {
                  label: 'Employee 1',
                  value: 'employee-1',
                },
                {
                  label: 'Employee 2',
                  value: 'employee-2',
                },
              ]}
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
