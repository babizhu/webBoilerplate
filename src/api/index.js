import Api from './api';

const api = new Api({
  //baseURI: 'http://192.168.2.109:8080/',
  baseURI: 'http://localhost:8080/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api
