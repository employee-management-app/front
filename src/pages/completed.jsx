import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { OrdersList } from '../components/OrdersList';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { getCompletedOrders, setCompletedOrders } from '../store';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useFilters } from '../hooks/useFilters';

export const Completed = () => {
  const [offset, setOffset] = React.useState(-1);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(getCompletedOrders);
  const { user, isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const { filters } = useFilters();

  const fetchData = React.useCallback((_offset = offset) => {
    setIsLoading(true);

    const params = { status: 'completed', offset: _offset, limit: 9, ...filters };

    (isEmployee
      ? fetchEmployeeOrders(user._id, params)
      : fetchOrders(params)
    )
      .then((data) => {
        dispatch(setCompletedOrders(data));
        setTotal(data.total);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, isEmployee, offset, pushNotification, filters, user._id]);

  React.useEffect(() => {
    if (offset === 0) {
      fetchData(0);
    }

    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  React.useEffect(() => {
    if (orders.length === 0 && offset > 0) {
      setOffset(0);

      return;
    }

    if (offset !== -1) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, orders.length]);

  return (
    <Container>
      <Grid alignItems="center">
        <GridEl size="fluid">
          <Text size="h2">Completed tasks ({total})</Text>
        </GridEl>
        <GridEl size="auto">
          <Filters />
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <OrdersList disabled orders={orders} />}
        </GridEl>
        <GridEl size="12">
          <Pagination offset={offset} limit={9} total={total} onChange={setOffset} />
        </GridEl>
      </Grid>
    </Container>
  );
};
