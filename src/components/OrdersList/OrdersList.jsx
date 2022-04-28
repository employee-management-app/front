import { Grid, GridEl } from '../Grid';
import { OrderCard } from '../OrderCard';
import { EmptyState } from '../EmptyState';
import { Button } from '../Button';

export const OrdersList = ({ orders }) => orders.length ? (
  <Grid>
    {orders.map((order) => (
      <GridEl size={{ xs: 12, md: 6, xl: 4 }} key={order.id}>
        <OrderCard {...order} />
      </GridEl>
    ))}
  </Grid>
) : (
  <EmptyState 
    title="Na razie nic tu nie ma"
    text="Tu będą wyświetlane nadchodzące pomiary. Jeśli myślisz że to jest błąd - skontaktuj się z administratorem."
    action={
      <Button>Skontaktuj się z administratorem</Button>
    }
  />
);
