import React from 'react';

import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Textarea } from '../Textarea';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export const OrderForm = ({ editMode = false, isLoading, fields, errors, onSubmit, onFieldChange }) => {
  const serviceTypeOptions = React.useMemo(() => [
    {
      label: 'Pomiar rolety',
      value: 'Pomiar rolety',
    },
    {
      label: 'Pomiar moskitier',
      value: 'Pomiar moskitier',
    },
    {
      label: 'Pomiar żaluzji aluminiowych',
      value: 'Pomiar żaluzji aluminiowych',
    },
    {
      label: 'Montaż żaluzji aluminiowych',
      value: 'Montaż żaluzji aluminiowych',
    },
  ], []);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
    >
      <Grid space={SPACES.L}>
        <GridEl size="12">
          <Grid>
            <GridEl size="6">
              <Field label={editMode && 'Name'} error={errors.name}>
                <Input 
                  value={fields.name}
                  placeholder="Name"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Surname'} error={errors.surname}>
                <Input 
                  value={fields.surname}
                  placeholder="Surname"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'surname')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Email'} error={errors.email}>
                <Input 
                  value={fields.email}
                  placeholder="Email"
                  type="email"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'email')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Phone'} error={errors.phone}>
                <Input 
                  value={fields.phone}
                  type="phone"
                  placeholder="Phone"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Field label={editMode && 'Service type'} error={errors.productType}>
                <Select 
                  value={fields.productType}
                  options={serviceTypeOptions}
                  placeholder="Service type"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'productType')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'City'} error={errors.city}>
                <Input 
                  value={fields.city}
                  placeholder="City"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'city')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Post code'} error={errors.code}>
                <Input 
                  value={fields.code}
                  placeholder="Post code"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'code')}
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Field label={editMode && 'Street'} error={errors.street}>
                <Input 
                  value={fields.street}
                  placeholder="Street"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'street')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'House number'} error={errors.house}>
                <Input 
                  value={fields.house}
                  placeholder="House number"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'house')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Flat number'} error={errors.flat}>
                <Input 
                  value={fields.flat}
                  placeholder="Flat number"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'flat')}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Field label={editMode && 'Description'} error={errors.message}>
            <Textarea 
              value={fields.message}
              placeholder="Type your message"
              size="medium"
              onChange={(e) => onFieldChange(e, 'message')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            {editMode ? 'Update' : 'Create'} measurement
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
