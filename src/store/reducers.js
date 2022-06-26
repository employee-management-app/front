import * as actions from './actions';

const setOrders = (state, action) => ({
  ...state,
  orders: action.payload,
});

const addOrder = (state, action) => ({
  ...state,
  orders: [action.payload, ...state.orders],
});

const setEmployees = (state, action) => ({
  ...state,
  employees: action.payload,
});

const updateOrder = (state, action) => {
  const index = state.orders.findIndex(({ _id }) => _id === action.payload._id);

  return {
    ...state,
    orders: Object.assign([], state.orders, { [index]: action.payload }),
  };
};

const deleteOrderById = (state, action) => ({
  ...state,
  orders: state.orders.filter(({ _id }) => _id !== action.payload),
});

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
  [actions.ADD_ORDER]: addOrder,
  [actions.SET_EMPLOYEES]: setEmployees,
  [actions.UPDATE_ORDER]: updateOrder,
  [actions.DELETE_ORDER_BY_ID]: deleteOrderById,
  [actions.PUSH_NOTIFICATION]: pushNotification,
  [actions.REMOVE_NOTIFICATION_BY_ID]: removeFirstNotification,
};
