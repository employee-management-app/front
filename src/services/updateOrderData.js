import axios from './axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const updateOrderData = (order) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/order-update-data/${order.id}`, order)
    .then(({ data }) => {
      resolve(sanitazeOrder(data));
    })
    .catch((err) => {
      reject(err);
    });
});
