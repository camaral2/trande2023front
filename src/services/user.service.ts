import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://200.98.128.106:3200/api/v1';

class UserService {
  getPublicContent() {
    console.log('Method UserService.getPublicContent');
    return axios.get(API_URL);
  }

  getUserBoard() {
    console.log('Method UserService.getUserBoard');
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}

export default new UserService();