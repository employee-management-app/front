import { Grid, GridEl } from '../Grid';
import { OrderCard } from '../OrderCard';

export const OrdersList = ({ orders }) => (
  <Grid>
    {orders.map((order) => (
      <GridEl size={{ xs: 12, md: 6, xl: 4 }} key={order.id}>
        <OrderCard {...order} />
      </GridEl>
    ))}
  </Grid>
);
