import * as actions from './actions';

const setOrders = (state, action) => ({
  ...state,
  orders: action.payload,
});

const updateOrder = (state, action) => {
  const index = state.orders.findIndex(({ id }) => id === action.payload.id);

  return {
    ...state,
    orders: Object.assign([], state.orders, { [index]: action.payload }),
  };
};

const pushNotification = (state, action) => ({
  ...state,
  notifications: [...state.notifications, action.payload],
});

const removeFirstNotification = (state, action) => {
  const notifications = state.notifications.filter(({ id }) => id !== action.payload);

  return {
    ...state,
    notifications,
  };
};

export const reducers = {
  [actions.SET_ORDERS]: setOrders,
  [actions.UPDATE_ORDER]: updateOrder,
  [actions.PUSH_NOTIFICATION]: pushNotification,
  [actions.REMOVE_NOTIFICATION_BY_ID]: removeFirstNotification,
};
