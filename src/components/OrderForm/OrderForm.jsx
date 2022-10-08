import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, setEmployees } from '../../store';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Textarea } from '../Textarea';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { DateTimePicker } from '../DateTimePicker';

export const OrderForm = ({ editMode = false, isLoading, fields, errors, onSubmit, onValueChange, onFieldChange }) => {
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);

  const employeesOptions = React.useMemo(() => (
    employees.map(({ _id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: _id,
    }))
  ), [employees]);

  const serviceTypeOptions = React.useMemo(() => [
    {
      label: 'Osłony wewnętrzne (rolety, żaluzje, plisy)',
      value: 'Osłony wewnętrzne',
    },
    {
      label: 'Osłony zewnętrzne (rolety, żaluzje, screeny, moskitiery)',
      value: 'Osłony zewnętrzne',
    },
    {
      label: 'Ogród (pergole, markizy)',
      value: 'Ogród',
    },
    {
      label: 'Inne (proszę opisać w polu Description)',
      value: 'Inne',
    },
  ], []);

  React.useEffect(() => {
    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  const handleScheduleTimeChange = React.useCallback(([startDate, endDate]) => {
    onValueChange(startDate, 'startDate');
    onValueChange(endDate, 'endDate');
  }, [onValueChange]);

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
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Service type'} error={errors.type}>
                <Select
                  value={fields.type}
                  options={serviceTypeOptions}
                  placeholder="Service type"
                  size="medium"
                  required
                  onChange={(e) => onFieldChange(e, 'type')}
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
            <GridEl size={{ xs: 12, sm: 6 }}>
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
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Assign employee'} error={errors.assignedEmployee}>
                <Select
                  value={fields.assignedEmployee}
                  options={employeesOptions}
                  placeholder="Select employee"
                  size="medium"
                  onClear={(val) => onValueChange(val, 'assignedEmployee')}
                  onChange={(e) => onFieldChange(e, 'assignedEmployee')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Schedule time'} error={errors.startDate || errors.endDate}>
                <DateTimePicker
                  value={[fields.startDate, fields.endDate]}
                  placeholder="Schedule time"
                  size="medium"
                  rangeMode="time"
                  onChange={handleScheduleTimeChange}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Field label={editMode && 'Description for employees'} error={errors.employeeMessage}>
            <Textarea
              value={fields.employeeMessage}
              placeholder="Type message for employees"
              size="medium"
              onChange={(e) => onFieldChange(e, 'employeeMessage')}
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
