import React from 'react';

import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { OrdersList } from '../components/OrdersList';
// import { useNotification } from '../hooks/useNotification';

export const Scheduled = () => {
  // const { pushNotification } = useNotification();

  React.useEffect(() => {
    // fetch employee orders (scheduled)
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h3">Scheduled measurements assigned to you</Text>
        </GridEl>
        <GridEl size="12">
          <OrdersList orders={[]} />
        </GridEl>
      </Grid>
    </Container>
  );
};
