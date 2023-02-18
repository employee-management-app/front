import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

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

export const Completed = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(getCompletedOrders);
  const { user, isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    setIsLoading(true);

    const filterKeys = Object.keys(Object.fromEntries([...searchParams]));

    const filters = filterKeys.reduce((acc, key) => {
      const values = searchParams.getAll(key);

      return {
        ...acc,
        [key]: values.length === 1 ? values[0] : values,
      };
    }, { unassigned: true, unscheduled: true });

    (isEmployee
      ? fetchEmployeeOrders(user._id, { status: 'completed' })
      : fetchOrders({ status: 'completed', ...filters })
    )
      .then((data) => {
        dispatch(setCompletedOrders(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <Container>
      <Grid alignItems="center">
        <GridEl size="fluid">
          <Text size="h2">Completed tasks</Text>
        </GridEl>
        <GridEl size="auto">
          <Filters />
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <OrdersList disabled orders={orders} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
