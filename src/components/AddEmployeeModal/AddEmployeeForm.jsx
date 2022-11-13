import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { getEmployees, setEmployees } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { addEmployee } from '../../services/addEmployee';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { Button } from '../Button';

export const AddEmployeeForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);
  const { pushNotification } = useNotification();

  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => ({
    email: {
      value: '',
      validation: yup.string().email().max(100).required(),
    },
    name: {
      value: '',
      validation: yup.string().max(100).required(),
    },
    surname: {
      value: '',
      validation: yup.string().max(100).required(),
    },
    phone: {
      value: '',
      validation: yup.string().min(6).max(100).required(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    addEmployee(fields)
      .then((data) => {
        onSuccess?.();
        dispatch(setEmployees([...employees, data]));
        pushNotification({ theme: 'success', content: 'Invitation link has been sent to the employee!' });
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid space={SPACES.L}>
        <GridEl size="12">
          <Grid>
            <GridEl size="6">
              <Field error={errors.name}>
                <Input
                  value={fields.name}
                  placeholder="Name"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.surname}>
                <Input
                  value={fields.surname}
                  placeholder="Surname"
                  onChange={(e) => onFieldChange(e, 'surname')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.email}>
                <Input
                  type="email"
                  value={fields.email}
                  placeholder="Email"
                  onChange={(e) => onFieldChange(e, 'email')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.phone}>
                <Input
                  value={fields.phone}
                  placeholder="Phone"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            Invite
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
