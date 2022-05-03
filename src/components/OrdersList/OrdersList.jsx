import { useSelector } from 'react-redux';

import { getOrders } from '../../store';

import { Grid, GridEl } from '../Grid';
import { OrderCard } from '../OrderCard';
import { EmptyState } from '../EmptyState';
import { Button } from '../Button';


export const OrdersList = () => {
  const orders = useSelector(getOrders);

  return orders.length ? (
    <Grid>
      {orders.map((order) => (
        <GridEl size={{ xs: 12, md: 6, xl: 4 }} key={order.id}>
          <OrderCard {...order} />
        </GridEl>
      ))}
    </Grid>
  ) : (
    <EmptyState 
      title="Nothing here yet"
      text="Upcoming measurements will be displayed here. If you think this is an error - contact the administrator."
      action={
        <Button>Contact the administrator</Button>
      }
    />
  );
};
