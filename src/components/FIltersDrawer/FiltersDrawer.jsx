import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, setEmployees } from '../../store';
import { STAGE_OPTIONS, PRIORITY_OPTIONS, PRODUCT_TYPE_OPTIONS } from '../../consts/order';
import { ReactComponent as FiltersIcon } from '../../assets/icons/filters.svg';
import { Button } from '../Button';
import { Drawer } from '../Drawer';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Multiselect } from '../Multiselect';
import { DateFilter } from '../DateFilter';
import { Checkbox } from '../Checkbox';

export const FiltersDrawer = () => {
  const dispatch = useDispatch();
  const { isVisible, hideDrawer } = useDrawerVisibility('FiltersDrawer');
  const [searchParams, setSearchParams] = useSearchParams();
  const employees = useSelector(getEmployees);

  React.useEffect(() => {
    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  const handleMultiFilterChange = (key) => (values) => {
    searchParams.delete(key);
    values.forEach((value) => {
      searchParams.append(key, value);
    });
    setSearchParams(searchParams);
  };

  const handleShowUnassignedChange = React.useCallback((e) => {
    if (!e.target.checked) {
      searchParams.set('unassigned', false);
    } else {
      searchParams.delete('unassigned');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleShowUnscheduledChange = React.useCallback((e) => {
    if (!e.target.checked) {
      searchParams.set('unscheduled', false);
    } else {
      searchParams.delete('unscheduled');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const resetFilters = React.useCallback(() => {
    setSearchParams([]);
  }, [setSearchParams]);

  const filters = React.useMemo(() => (
    Object.fromEntries([...searchParams])
  ), [searchParams]);

  const filtersCount = React.useMemo(() => (
    Object.keys(filters)
      .filter((key) => !['endDate', 'unassigned', 'unscheduled'].includes(key))
      .reduce((acc) => acc + 1, 0)
  ), [filters]);

  const employeesOptions = employees.map(({ _id, name, surname }) => ({
    label: `${name} ${surname}`,
    value: _id,
  }));

  const drawerTitle = `Filters${filtersCount ? ` (${filtersCount})` : ''}`;

  return (
    <Drawer title={drawerTitle} isOpen={isVisible} onClose={hideDrawer}>
      <Grid space={SPACES.L}>
        <GridEl size="12">
          <Field label="Scheduled time">
            <DateFilter theme="input" />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Employee">
            <Multiselect
              values={searchParams.getAll('employee')}
              options={employeesOptions}
              placeholder="Select employee"
              size="medium"
              onChange={handleMultiFilterChange('employee')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Stage">
            <Multiselect
              values={searchParams.getAll('stage')}
              options={STAGE_OPTIONS}
              placeholder="Select stage"
              size="medium"
              onChange={handleMultiFilterChange('stage')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Priority">
            <Multiselect
              values={searchParams.getAll('priority')}
              options={PRIORITY_OPTIONS}
              placeholder="Select priority"
              size="medium"
              onChange={handleMultiFilterChange('priority')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Product type">
            <Multiselect
              values={searchParams.getAll('type')}
              options={PRODUCT_TYPE_OPTIONS}
              placeholder="Select type"
              size="medium"
              onChange={handleMultiFilterChange('type')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="12">
              <Checkbox checked={searchParams.get('unassigned') !== 'false'} onChange={handleShowUnassignedChange}>
                Show unassigned
              </Checkbox>
            </GridEl>
            <GridEl size="12">
              <Checkbox checked={searchParams.get('unscheduled') !== 'false'} onChange={handleShowUnscheduledChange}>
                Show unscheduled
              </Checkbox>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="auto">
              <Button onClick={hideDrawer}>Close panel</Button>
            </GridEl>
            {filtersCount > 0 && (
              <GridEl size="auto">
                <Button icon={FiltersIcon} onClick={resetFilters}>Clear filters</Button>
              </GridEl>
            )}
          </Grid>
        </GridEl>
      </Grid>
    </Drawer>
  );
};
