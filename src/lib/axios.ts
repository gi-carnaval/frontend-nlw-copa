import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nlw-copa-server.giovani-carnaval.com/'
})