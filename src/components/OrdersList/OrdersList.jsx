import { Grid, GridEl } from '../Grid';
import { Card } from '../Card';

export const OrdersList = ({ orders }) => (
  <Grid>
    {orders.map(({ id }) => (
      <GridEl size={{ xs: 12, md: 6 }} key={id}>
        <Card horizontal />
      </GridEl>
    ))}
  </Grid>
);
