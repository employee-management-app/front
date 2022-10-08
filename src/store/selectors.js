export const getOrders = (state) => state.orders;
export const getOrder = (state) => state.order;
export const getEmployees = (state) => state.employees;
export const getNotifications = (state) => state.notifications;
export const getIsModalVisible = (modal) => (state) => state.visibleModals.includes(modal);
