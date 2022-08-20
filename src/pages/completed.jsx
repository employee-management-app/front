import React from 'react';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { OrdersList } from '../components/OrdersList';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';

export const Completed = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const { user, isEmployee } = useAuth();
  const { pushNotification } = useNotification();

  React.useEffect(() => {
    setIsLoading(true);

    (isEmployee ? fetchEmployeeOrders(user._id, { status: 'completed' }) : fetchOrders({ status: 'completed' }))
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h2">Completed measurements</Text>
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <OrdersList disabled orders={orders} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
