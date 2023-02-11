export const SET_ORDERS = 'SET_ORDERS';
export const SET_COMPLETED_ORDERS = 'SET_COMPLETED_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER_BY_ID = 'DELETE_ORDER_BY_ID';
export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_TO_EDIT = 'SET_ORDER_TO_EDIT';
export const SET_ORDER_TO_DUPLICATE = 'SET_ORDER_TO_DUPLICATE';
export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const REMOVE_NOTIFICATION_BY_ID = 'REMOVE_NOTIFICATION_BY_ID';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const HIDE_ALL_MODALS = 'HIDE_ALL_MODALS';
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';
export const HIDE_ALL_DRAWERS = 'HIDE_ALL_DRAWERS';

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const setCompletedOrders = (completedOrders) => ({
  type: SET_COMPLETED_ORDERS,
  payload: completedOrders,
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

export const setOrderToEdit = (order) => ({
  type: SET_ORDER_TO_EDIT,
  payload: order,
});

export const setOrderToDuplicate = (order) => ({
  type: SET_ORDER_TO_DUPLICATE,
  payload: order,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const setEmployee = (employee) => ({
  type: SET_EMPLOYEE,
  payload: employee,
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
  type: HIDE_ALL_MODALS,
});

export const showDrawer = (drawer) => ({
  type: SHOW_DRAWER,
  payload: drawer,
});

export const hideDrawer = (drawer) => ({
  type: HIDE_DRAWER,
  payload: drawer,
});

export const hideAllDrawers = () => ({
  type: HIDE_ALL_DRAWERS,
});
