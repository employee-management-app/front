import React from 'react';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'This field is invalid',
    required: 'This field is required',
  },
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: 'This field should contain minimum ${min} characters',
    email: 'Email must be a valid email',
  },
});

export const useForm = (callback) => {
  const config = callback(yup);

  const defaultFields = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].value }), {});
  const validations = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].validation }), {});
  const schema = yup.object().shape(validations);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isShowErrors, setIsShowErrors] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [fields, setFields] = React.useState(defaultFields);

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();

    schema.validate(fields, { abortEarly: false }).catch(({ inner }) => {
      const validation = inner.reduce((acc, { path, message }) => ({ ...acc, [path]: message }), {});
      setErrors(validation);
      setIsShowErrors(true);
    });
  }, [fields, schema]);

  const onFieldChange = React.useCallback(async (e, field) => {
    const updatedFields = { ...fields, [field]: e.target.value };

    setFields(updatedFields);
    setErrors(errs => ({ ...errs, [field]: '' }));

    schema.isValid(updatedFields).then(valid => setIsValid(valid));

    if (isShowErrors) {
      schema.validateAt(field, updatedFields).catch(({ message }) => {
        setErrors(errs => ({ ...errs, [field]: message }));
      });
    }
  }, [schema, fields, isShowErrors]);

  return { 
    fields, 
    errors, 
    isValid, 
    isLoading,
    setFields,
    setErrors, 
    setIsLoading, 
    onFieldChange, 
    onSubmit, 
  };
};
