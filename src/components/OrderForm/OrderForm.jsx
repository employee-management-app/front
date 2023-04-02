import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePlacesWidget } from 'react-google-autocomplete';

import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, setEmployees } from '../../store';
import { STAGE_OPTIONS, PRODUCT_TYPE_OPTIONS } from '../../consts/order';
import { Grid, GridEl } from '../Grid';
import { Field } from '../Field';
import { Textarea } from '../Textarea';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { DateTimePicker } from '../DateTimePicker';

export const OrderForm = (props) => {
  const {
    editMode = false,
    errors,
    fields,
    isLoading,
    onFieldChange,
    onSubmit,
    onValueChange,
    submitLabel = 'Create task',
  } = props;

  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);

  const employeesOptions = React.useMemo(() => (
    employees.map(({ _id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: _id,
    }))
  ), [employees]);

  const { ref } = usePlacesWidget({
    options: {
      types: ['address'],
    },
    onPlaceSelected: (place) => {
      const values = Object.values(place.address_components);

      // eslint-disable-next-line max-len
      const city = values.find(({ types }) => types.includes('administrative_area_level_2') || types.includes('locality'))?.long_name;
      const street = values.find(({ types }) => types.includes('route'))?.long_name;
      const code = values.find(({ types }) => types.includes('postal_code'))?.long_name;
      const house = values.find(({ types }) => types.includes('street_number') || types.includes('premise'))?.long_name;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onValueChange(city, 'city');
      onValueChange(street, 'street');
      onValueChange(code, 'code');
      onValueChange(house, 'house');
      onValueChange(lat, 'lat');
      onValueChange(lng, 'lng');
      onValueChange(place.formatted_address, 'fullAddress');
    },
  });

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

  const dateTimePickerValue = React.useMemo(() => (
    [fields.startDate, fields.endDate]
  ), [fields.endDate, fields.startDate]);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
    >
      <Grid>
        <GridEl size="12">
          <Grid>
            <GridEl size="12">
              <Field label={editMode && 'Address'} error={errors.fullAddress}>
                <Input
                  ref={ref}
                  value={fields.fullAddress}
                  placeholder="Address*"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'fullAddress')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'House number'} error={errors.house}>
                <Input
                  value={fields.house}
                  placeholder="House number*"
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
                  placeholder="Phone*"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Product type'} error={errors.type}>
                <Select
                  value={fields.type}
                  options={PRODUCT_TYPE_OPTIONS}
                  placeholder="Product type*"
                  size="medium"
                  required
                  onChange={(e) => onFieldChange(e, 'type')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Stage'} error={errors.stage}>
                <Select
                  value={fields.stage}
                  options={STAGE_OPTIONS}
                  placeholder="Stage*"
                  size="medium"
                  required
                  onChange={(e) => onFieldChange(e, 'stage')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Assignee'} error={errors.assignedEmployee}>
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
                  value={dateTimePickerValue}
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
              placeholder="Message for employees"
              size="medium"
              onChange={(e) => onFieldChange(e, 'employeeMessage')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label={editMode && 'Description for managers'} error={errors.employeeMessage}>
            <Textarea
              value={fields.managerMessage}
              placeholder="Message for managers"
              size="medium"
              onChange={(e) => onFieldChange(e, 'managerMessage')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            {submitLabel}
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
