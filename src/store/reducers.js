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

export const reducers = {
  [actions.SET_ORDERS]: setOrders,
  [actions.UPDATE_ORDER]: updateOrder,
};
