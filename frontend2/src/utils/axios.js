import axios from "axios";


export const api = axios.create({
  baseURL: 'https://chimptypeserver.onrender.com'
})
