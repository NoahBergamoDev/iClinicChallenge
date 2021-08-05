import axios from 'axios';

export const instanceAPI = axios.create({
  baseURL: 'https://iclinic-example-api-rest.herokuapp.com/',
  timeout: 15000,
  headers: { Accept: 'application/json' }
});
