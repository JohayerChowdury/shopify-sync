//Purpose: Creator for actions related to stores. Imported StoreService to make async HTTP requests with trigger dispatch on the result

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom, userAtom } from '../states';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetchWrapper from '../helpers/FetchWrapper';

function useStoreActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/stores`;
  const fetchWrapper = useFetchWrapper();

  const setUser = useSetRecoilState(userAtom);
  const auth = useRecoilValue(authAtom);

  const navigate = useNavigate();
  const location = useLocation();

  return {
    getAll,
    getOne,
    add,
    update,
    remove,
    getProducts,
    sync,
    getOneProduct,
  };

  async function getAll() {
    try {
      const stores = await fetchWrapper.get(baseUrl);
      return stores;
    } catch (err) {
      console.log(err);
    }
  }

  async function getOne(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      console.log(overallRoute);
      const store = await fetchWrapper.get(overallRoute);
      return store;
    } catch (err) {
      console.log(err);
    }
  }

  async function add(store) {
    try {
      const new_store = await fetchWrapper.post(baseUrl, store);
      navigate('/stores');
    } catch (err) {
      console.log(err);
    }
  }

  async function update(storeId, store) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      const update_store = await fetchWrapper.put(overallRoute, store);
    } catch (err) {
      console.log(err);
    }
  }

  async function remove(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      await fetchWrapper.delete(overallRoute);
      navigate('/stores');
    } catch (err) {
      console.log(err);
    }
  }

  async function getProducts(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products`;
      const products = await fetchWrapper.get(overallRoute);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async function sync(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products`;
      await fetchWrapper.post(overallRoute);
      navigate(`/stores/${storeId}/products`);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneProduct(storeId, productId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products/${productId}`;
      const product = fetchWrapper.get(overallRoute);
      return product;
    } catch (err) {
      console.log(err);
    }
  }
}

export { useStoreActions };
