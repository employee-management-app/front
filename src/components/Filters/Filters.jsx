import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as FiltersIcon } from '../../assets/icons/filters.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { useAuth } from '../../hooks/useAuth';
import { Grid, GridEl, SPACES } from '../Grid';
import { Checkbox } from '../Checkbox';
import { Popover } from '../Popover';
import { Text } from '../Text';
import { Field } from '../Field';
import { DateFilter } from '../DateFilter';

import styles from './Filters.module.scss';

export const Filters = () => {
  const [isPopoverVisible, setIsVisible] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isManager } = useAuth();

  const togglePopover = React.useCallback(() => {
    setIsVisible((visible) => !visible);
  }, []);

  const resetFilters = React.useCallback(() => {
    setSearchParams([]);
    setIsVisible(false);
  }, [setSearchParams]);

  const handleAssignedEmployeeChange = React.useCallback((e) => {
    if (e.target.checked) {
      searchParams.set('assignedEmployee', true);
    } else {
      searchParams.delete('assignedEmployee');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleStartDateChange = React.useCallback((e) => {
    if (e.target.checked) {
      searchParams.set('startDate', true);
    } else {
      searchParams.delete('startDate');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const filters = React.useMemo(() => (
    Object.fromEntries([...searchParams])
  ), [searchParams]);

  const filtersCount = React.useMemo(() => (
    Object.keys(filters).reduce((acc, key) => (key === 'dateEnd' ? acc : acc + 1), 0)
  ), [filters]);

  const content = () => (
    <Grid alignItems="center" justifyContent="space-between">
      <GridEl size="auto">
        <Text size="medium" fontWeight="700">Filters{filtersCount ? ` (${filtersCount})` : ''}</Text>
      </GridEl>
      {filtersCount > 0 && (
        <GridEl size="auto">
          <button type="button" className={styles.clearButton} onClick={resetFilters}>
            Clear filters
            <CloseIcon />
          </button>
        </GridEl>
      )}
      <GridEl size="12">
        <Field label="Scheduled time">
          <DateFilter theme="input" />
        </Field>
      </GridEl>
      {isManager && (
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="12">
              <Checkbox checked={!!filters.assignedEmployee} onChange={handleAssignedEmployeeChange}>
                Show assigned
              </Checkbox>
            </GridEl>
            <GridEl size="12">
              <Checkbox checked={!!filters.startDate} onChange={handleStartDateChange}>
                Show scheduled
              </Checkbox>
            </GridEl>
          </Grid>
        </GridEl>
      )}
    </Grid>
  );

  return (
    <Popover
      visible={isPopoverVisible}
      content={content()}
      className={styles.popover}
      placement="bottom-end"
      possiblePlacements={['bottom-center', 'bottom-end']}
      onVisibleChange={togglePopover}
    >
      <button type="button" className={styles.button} onClick={togglePopover}>
        <span className={styles.label}>Filters</span>
        <FiltersIcon />
        {filtersCount > 0 && <span className={styles.count}>{filtersCount}</span>}
      </button>
    </Popover>
  );
};
