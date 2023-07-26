import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://200.98.128.106:3200/api/v1/';

class AcaoDataService {
  getAllAcoes() {
    return axios.get(API_URL + 'acao', { headers: authHeader() });
  }
  getAllCompras(acao: string | undefined) {
    return axios.get(API_URL + 'compra/63b34f5da25fbb24d295ab24', { headers: authHeader() });
  }
}

export default new AcaoDataService();