import React from 'react';

import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { Spinner } from '../components/Spinner';
import { OrdersList } from '../components/OrdersList';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';

export const Scheduled = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const { pushNotification } = useNotification();
  const { user } = useAuth();

  React.useEffect(() => {
    setIsLoading(true);

    fetchEmployeeOrders(user.id, { scheduled: true })
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' })
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h3">Scheduled measurements assigned to you</Text>
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <OrdersList orders={orders} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
