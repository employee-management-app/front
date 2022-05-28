import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const updateOrder = (order) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/order-update/${order.id}`, {
    order: order.id,
    assign: (order.assigned && typeof order.assigned === 'object') ? order.assigned.id : order.assigned,
    status: order.priority,
    start_date: order.date.toISOString(),
    measurement_date: order.schedule ? new Date(order.schedule).toISOString() : order.schedule,
    groupId: order.groupId,
  })
    .then(({ data }) => {
      resolve(sanitazeOrder(data));
    })
    .catch((err) => {
      reject(err);
    });
});
