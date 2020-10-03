import axios from 'axios';
const API = (methodType, endpoint, payload, authRequire = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (endpoint.includes('herokuapp')) {
    headers.language = 'EN';
    if (!authRequire) {
      headers.Authorization =
        '06d0800f3a0c84cabeefb561ddfdaae9568be62c3b18fdd0827f6f2c80162e49ba7ea07fcafd2b61e49a0c7364a9830e059c374d3ada256746b8534079830c56';
    }
  }
  return axios({
    method: methodType,
    url: endpoint,
    data: payload,
    headers,
  });
};

axios.interceptors.request.use(request => {
  // const user = JSON.parse(localStorage.getItem('user'));
  // if (user && user.token) {
  //   // Modify request here
  //   request.headers['x-access-token'] = user.token;
  // }
  return request;
});
axios.interceptors.response.use(
  response => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // if (user && user.token) {
    //   // Modify request here
    //   request.headers['x-access-token'] = user.token;
    // }
    return response;
  },
  error => {
    throw error;
  },
);
export default API;
