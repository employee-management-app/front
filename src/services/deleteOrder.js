import axios from 'axios';

export const deleteOrder = (id) => new Promise((resolve, reject) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/order/${id}`, { withCredentials: true })
    .then(({ data }) => { resolve(data) })
    .catch((err) => { reject(err) });
});
