import React from 'react';

import { useForm } from '../../hooks/useForm';
import { Grid, GridEl } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';

export const GeneralInformationForm = ({ company, ...props }) => {
  const {
    fields,
    errors,
    isValid,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => ({
    name: {
      value: company.name,
      validation: yup.string().max(100).required(),
    },
    canAddImages: {
      value: company.canAddImages,
      validation: yup.boolean(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    props.onSubmit(fields);
  };

  return (
    <form id="general-information-form" noValidate onSubmit={handleSubmit}>
      <Grid>
        <GridEl size="12">
          <Field label="Company name" error={errors.name}>
            <Input
              value={fields.name}
              placeholder="Name"
              onChange={(e) => onFieldChange(e, 'name')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Checkbox checked={fields.canAddImages} onChange={(e) => onValueChange(e.target.checked, 'canAddImages')}>
            Can add images
          </Checkbox>
        </GridEl>
      </Grid>
    </form>
  );
};
