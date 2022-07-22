//Purpose: Create a service that uses axios object to send HTTP requests

import axios from 'axios';
class StoreService {
  getAll() {
    return axios.get('/shopify_api/stores');
  }
  get(store) {
    return axios.get(`/shopify_api/stores/${store.storeId}`);
  }
  add(store) {
    return axios.post('/shopify_api/stores', store);
  }
  update(store) {
    return axios.put(`/shopify_api/stores/${store.storeId}`, store);
  }
  delete(store) {
    return axios.delete(`/shopify_api/stores/${store.storeId}`, {
      data: store,
    });
  }
  saveStore(store) {
    return store.storeId ? this.update(store) : this.add(store);
  }
}
export default new StoreService();
