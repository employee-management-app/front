import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const fetchOrders = () => new Promise((resolve, reject) => {
  const assigners = {};

  axios.get(`${process.env.REACT_APP_API_URL}/orders`)
    .then(({ data }) => {
      resolve(
        data.reduce((acc, order) => {
          if (order.assign) {
            if (!assigners[order.assign.id]) {
              assigners[order.assign.id] = Object.keys(assigners).length + 1;
            }

            return [...acc, { ...sanitazeOrder(order), groupId: assigners[order.assign.id] }];
          }

          return [...acc, sanitazeOrder(order)];
        }, [])
      );
    })
    .catch((err) => {
      reject(err);
    });
});
