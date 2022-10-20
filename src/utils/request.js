import axios from 'axios'
const request = axios.create({
  baseURL: 'http://81.69.235.123:3000/',
  timeout: 3000
})
export default request;
