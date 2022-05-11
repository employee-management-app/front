import axios from 'axios';

export const fetchEmployees = () => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/employees`)
    .then(({ data }) => {
      resolve(data.map(({ is_manager, ...rest }) => rest));
    })
    .catch((err) => {
      reject(err);
    });
});
