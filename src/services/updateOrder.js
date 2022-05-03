import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const updateOrder = (order) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/order-update/${order.id}`, {
    order: order.id,
    assign: order.assigned,
    status: order.priority,
    start_date: order.date.toISOString(),
    measurement_date: new Date(order.schedule).toISOString(),
  })
    .then(({ data }) => {
      resolve(sanitazeOrder(data));
    })
    .catch((err) => {
      reject(err);
    });
});
