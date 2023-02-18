import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as FiltersIcon } from '../../assets/icons/filters.svg';

import styles from './Filters.module.scss';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';

export const Filters = () => {
  const { toggleDrawer } = useDrawerVisibility('FiltersDrawer');
  const [searchParams] = useSearchParams();

  const filters = React.useMemo(() => (
    Object.fromEntries([...searchParams])
  ), [searchParams]);

  const filtersCount = React.useMemo(() => (
    Object.keys(filters)
      .filter((key) => !['endDate', 'unassigned', 'unscheduled'].includes(key))
      .reduce((acc) => acc + 1, 0)
  ), [filters]);

  return (
    <button type="button" className={styles.button} onClick={toggleDrawer}>
      <span className={styles.label}>Filters</span>
      <FiltersIcon />
      {filtersCount > 0 && <span className={styles.count}>{filtersCount}</span>}
    </button>
  );
};
