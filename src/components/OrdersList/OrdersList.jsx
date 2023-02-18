import React from 'react';

import { Grid, GridEl } from '../Grid';
import { OrderCard } from '../OrderCard';
import { EmptyState } from '../EmptyState';

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
    title="No results"
    text="If you have filters applied, try resetting them or changing your search criteria."
  />
));
