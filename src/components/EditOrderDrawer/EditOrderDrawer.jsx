import React from 'react';
import { useSelector } from 'react-redux';

import { getOrder } from '../../store';
import { Drawer } from '../Drawer';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { EditOrderForm } from '../OrderForm';

export const EditOrderDrawer = () => {
  const { isVisible, hideDrawer } = useDrawerVisibility('EditOrder');
  const order = useSelector(getOrder);

  return (
    <Drawer
      isOpen={isVisible}
      title="Edit task"
      onClose={hideDrawer}
    >
      <EditOrderForm values={order} onSuccess={hideDrawer} />
    </Drawer>
  );
};
