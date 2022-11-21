import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://165.22.194.0/'
})