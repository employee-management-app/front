import React from 'react';

import { Grid, GridEl } from '../Grid';
import { OrderCard } from '../OrderCard';
import { EmptyState } from '../EmptyState';
import { Button } from '../Button';

export const OrdersList = ({ orders, disabled = false }) => (orders.length ? (
  <Grid>
    {orders.map((order) => (
      <GridEl key={order._id} size={{ xs: 12, md: 6, xl: 4 }} filled>
        <OrderCard disabled={disabled} {...order} />
      </GridEl>
    ))}
  </Grid>
) : (
  <EmptyState
    title="Nothing here yet"
    text="Measurements will be displayed here. If you think this is an error - contact the administrator."
    action={
      <Button>Contact the administrator</Button>
    }
  />
));
