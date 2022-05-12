import React from 'react';

import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { OrdersList } from '../components/OrdersList';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';

export const Anytime = () => {
  const [orders, setOrders] = React.useState([]);

  const { pushNotification } = useNotification();
  const { user } = useAuth();

  React.useEffect(() => {
    fetchEmployeeOrders(user.id, { scheduled: false })
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' })
      });
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h3">Measurements assigned to you</Text>
        </GridEl>
        <GridEl size="12">
          <OrdersList orders={orders} />
        </GridEl>
      </Grid>
    </Container>
  );
};
