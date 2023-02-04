import * as actions from './actions';

// Orders

const setOrders = (state, action) => ({
  ...state,
  orders: action.payload,
});

const setCompletedOrders = (state, action) => ({
  ...state,
  completedOrders: action.payload,
});

const addOrder = (state, action) => ({
  ...state,
  orders: [action.payload, ...state.orders],
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
  completedOrders: state.completedOrders.filter(({ _id }) => _id !== action.payload),
});

// Order

const setOrder = (state, action) => ({
  ...state,
  order: action.payload,
});

// Employees

const setEmployees = (state, action) => ({
  ...state,
  employees: action.payload,
});

const updateEmployee = (state, action) => {
  const index = state.employees.findIndex(({ _id }) => _id === action.payload._id);

  return {
    ...state,
    employees: Object.assign([], state.employees, { [index]: action.payload }),
  };
};

// Employee

const setEmployee = (state, action) => ({
  ...state,
  employee: action.payload,
});

// UI

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

const showModal = (state, action) => ({
  ...state,
  visibleModals: [...state.visibleModals, action.payload],
});

const hideModal = (state, action) => ({
  ...state,
  visibleModals: state.visibleModals.filter((modal) => modal !== action.payload),
});

const hideAllModals = (state) => ({
  ...state,
  visibleModals: [],
});

const showDrawer = (state, action) => ({
  ...state,
  visibleDrawers: [...state.visibleDrawers, action.payload],
});

const hideDrawer = (state, action) => ({
  ...state,
  visibleDrawers: state.visibleDrawers.filter((drawer) => drawer !== action.payload),
});

const hideAllDrawers = (state) => ({
  ...state,
  visibleDrawers: [],
});

export const reducers = {
  [actions.SET_ORDERS]: setOrders,
  [actions.SET_COMPLETED_ORDERS]: setCompletedOrders,
  [actions.ADD_ORDER]: addOrder,
  [actions.UPDATE_ORDER]: updateOrder,
  [actions.DELETE_ORDER_BY_ID]: deleteOrderById,
  [actions.SET_ORDER]: setOrder,
  [actions.SET_EMPLOYEE]: setEmployee,
  [actions.SET_EMPLOYEES]: setEmployees,
  [actions.UPDATE_EMPLOYEE]: updateEmployee,
  [actions.PUSH_NOTIFICATION]: pushNotification,
  [actions.REMOVE_NOTIFICATION_BY_ID]: removeFirstNotification,
  [actions.SHOW_MODAL]: showModal,
  [actions.HIDE_MODAL]: hideModal,
  [actions.HIDE_ALL_MODALS]: hideAllModals,
  [actions.SHOW_DRAWER]: showDrawer,
  [actions.HIDE_DRAWER]: hideDrawer,
  [actions.HIDE_ALL_DRAWERS]: hideAllDrawers,
};
