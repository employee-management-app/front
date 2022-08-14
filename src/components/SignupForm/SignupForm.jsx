import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import axios from '../../services/axios';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';

import { Container } from '../Container';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Text } from '../Text';
import { Input } from '../Input';
import { Button } from '../Button';
import { Link } from '../Link';

const getConfig = (yup) => ({
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
  password: {
    value: '',
    validation: yup.string().min(8).max(100).required(),
  },
  repeatPassword: {
    value: '',
    validation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required(),
  },
});

export const SignupForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setFields,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const { pushNotification } = useNotification();

  const navigate = useNavigate();

  React.useEffect(() => {
    const role = searchParams.get('role');

    if (!role || role !== 'manager') {
      searchParams.set('role', 'employee');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  React.useEffect(() => {
    setFields((prevFields) => ({
      ...prevFields,
      role: searchParams.get('role'),
    }));
  }, [searchParams, setFields]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      pushNotification({ theme: 'warning', content: 'Please fill in all required fields!' });

      return;
    }

    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, fields)
      .then(() => {
        setFields({});
        navigate('/login');
        pushNotification({
          theme: 'success',
          content: 'The account has been registered! Now you can log into the system.',
        });
      })
      .catch((err) => {
        const { message } = err.response.data || {};

        pushNotification({ theme: 'error', content: message || 'Something went wrong...' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container height="full">
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid space={SPACES.XL}>
          <GridEl size={{ xs: 12, lg: 8 }}>
            <Grid space={SPACES.L}>
              <GridEl size="12">
                <Text size="h2">Create a new account</Text>
              </GridEl>
              <GridEl size="12">
                <Text>
                  Fill in the details in the form below to create an account.
                  With this data you will be able to authorize to the system later. All the fields are required.
                </Text>
              </GridEl>
              <GridEl size="12">
                <Field error={errors.email}>
                  <Input
                    value={fields.email}
                    size="medium"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => onFieldChange(e, 'email')}
                  />
                </Field>
              </GridEl>
              <GridEl size="12">
                <Field error={errors.phone}>
                  <Input
                    value={fields.phone}
                    size="medium"
                    type="phone"
                    placeholder="Phone number"
                    onChange={(e) => onFieldChange(e, 'phone')}
                  />
                </Field>
              </GridEl>
              <GridEl size={{ xs: 12, sm: 6 }}>
                <Field error={errors.name}>
                  <Input
                    value={fields.name}
                    size="medium"
                    placeholder="Name"
                    onChange={(e) => onFieldChange(e, 'name')}
                  />
                </Field>
              </GridEl>
              <GridEl size={{ xs: 12, sm: 6 }}>
                <Field error={errors.surname}>
                  <Input
                    value={fields.surname}
                    size="medium"
                    placeholder="Surname"
                    onChange={(e) => onFieldChange(e, 'surname')}
                  />
                </Field>
              </GridEl>
              <GridEl size={{ xs: 12, sm: 6 }}>
                <Field error={errors.password}>
                  <Input
                    value={fields.password}
                    size="medium"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => onFieldChange(e, 'password')}
                  />
                </Field>
              </GridEl>
              <GridEl size={{ xs: 12, sm: 6 }}>
                <Field error={errors.repeatPassword}>
                  <Input
                    value={fields.repeatPassword}
                    size="medium"
                    type="password"
                    placeholder="Repeat password"
                    onChange={(e) => onFieldChange(e, 'repeatPassword')}
                  />
                </Field>
              </GridEl>
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Grid space={SPACES.L}>
              <GridEl size="12">
                <Button
                  type="submit"
                  size="medium"
                  loading={isLoading}
                >
                  Create account
                </Button>
              </GridEl>
              <GridEl size="12">
                <Link to="/">
                  Already have an account? Log in
                </Link>
              </GridEl>
            </Grid>
          </GridEl>
        </Grid>
      </form>
    </Container>
  );
};
