export const SET_ORDERS = 'SET_ORDERS';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  payload: order,
});
