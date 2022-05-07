import React from 'react';
import { useDispatch } from 'react-redux';

import { pushNotification as pushNotificationToStore, removeNotificationById } from '../store';

export const useNotification = () => {
  const dispatch = useDispatch();

  const pushNotification = React.useCallback((notification) => {
    const id = `${Date.now()}`;

    dispatch(pushNotificationToStore({ id, ...notification }));

    setTimeout(() => {
      dispatch(removeNotificationById(id));
    }, 7000);
  }, [dispatch]);

  return {
    pushNotification,
  };
};
