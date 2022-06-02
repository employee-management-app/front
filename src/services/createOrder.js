import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const createOrder = (order) => new Promise((resolve, reject) => {
  axios.post(`${process.env.REACT_APP_API_URL}/order-create`, order)
    .then(({ data }) => {
      resolve(sanitazeOrder(data));
    })
    .catch((err) => {
      reject(err);
    });
});
