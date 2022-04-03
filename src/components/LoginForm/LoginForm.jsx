import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import { Container } from '../Container';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Text } from '../Text';
import { Input } from '../Input';
import { Button } from '../Button';

import styles from './LoginForm.module.scss';

const getConfig = (yup) => ({
  email: {
    value: '',
    validation: yup.string().email().required(),
  },
  password: {
    value: '',
    validation: yup.string().min(8),
  },
});

export const LoginForm = () => {
  const navigate = useNavigate();
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

  const { onLogin } = useAuth(fields);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    onLogin(fields)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container className={styles.container}>
      <form 
        noValidate 
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Grid space={SPACES.XL}>
          <GridEl size="12">
            <Text size="h2" center>Log in to your account</Text>
          </GridEl>
          <GridEl size="12">
            <Grid>
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
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Button 
              type="submit" 
              size="medium"
              width="full"
              loading={isLoading}
            >
              Log in
            </Button>
          </GridEl>
        </Grid>
      </form>
    </Container>
  );
};
