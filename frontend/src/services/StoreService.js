//Purpose: Create a service module that uses axios object to send HTTP requests to backend.

import axios from 'axios';
class StoreService {
  getAll() {
    return axios.get('/shopify_api/stores');
  }
  // get(store) {
  //   return axios.get(`/shopify_api/stores/${store.storeId}`);
  // }
  // UPDATED ABOVE ROUTE BELOW, Probably Wrong, Testing for Now
  get(storeId) {
    return axios.get(`/shopify_api/stores/${storeId}`);
  }
  add(store) {
    return axios.post('/shopify_api/stores', store);
  }
  // update(store) {
  //   return axios.put(`/shopify_api/stores/${store.storeId}`, store);
  // }
  // UPDATED ABOVE ROUTE BELOW, Probably Wrong, Testing for Now
  update(storeId, store) {
    return axios.put(`/shopify_api/stores/${storeId}`, store);
  }
  // delete(store) {
  //   return axios.delete(`/shopify_api/stores/${store.storeId}`, {
  //     data: store,
  //   });
  // }
  //UPDATED ABOVE ROUTE BELOW, Probably Wrong, Testing for Now
  delete(storeId, store) {
    return axios.delete(`/shopify_api/stores/${storeId}`, {
      data: store,
    });
  }

  //not in use yet
  saveStore(store) {
    return store.storeId ? this.update(store) : this.add(store);
  }

  getProducts(storeId) {
    return axios.get(`/shopify_api/stores/${storeId}/products`);
  }

  sync(storeId) {
    return axios.post(`/shopify_api/stores/${storeId}/products`);
  }

  getSpecificProduct(storeId, productId) {
    return axios.get(`/shopify_api/stores/${storeId}/products/${productId}`);
  }
}
export default new StoreService();
