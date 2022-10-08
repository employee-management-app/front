export const SET_ORDERS = 'SET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER_BY_ID = 'DELETE_ORDER_BY_ID';
export const SET_ORDER = 'SET_ORDER';
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const REMOVE_NOTIFICATION_BY_ID = 'REMOVE_NOTIFICATION_BY_ID';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const HIDE_ALL_MODALS = 'HIDE_ALL_MODALS';

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  payload: order,
});

export const deleteOrderById = (order) => ({
  type: DELETE_ORDER_BY_ID,
  payload: order,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const pushNotification = (notification) => ({
  type: PUSH_NOTIFICATION,
  payload: notification,
});

export const removeNotificationById = (id) => ({
  type: REMOVE_NOTIFICATION_BY_ID,
  payload: id,
});

export const showModal = (modal) => ({
  type: SHOW_MODAL,
  payload: modal,
});

export const hideModal = (modal) => ({
  type: HIDE_MODAL,
  payload: modal,
});

export const hideAllModals = () => ({
  type: HIDE_MODAL,
});
