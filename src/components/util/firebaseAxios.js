import axios from 'axios'
import {firebase} from './movieDb'

const instance = axios.create({
    baseURL: firebase.BASEURL
})
 /* 
instance.interceptors.request.use(function (config) {
 
  config.params = {
    api_key: firebase.API_KEY
  };
  return config;

}, function (error) {
 
  return Promise.reject(error);
}); */

export default instance