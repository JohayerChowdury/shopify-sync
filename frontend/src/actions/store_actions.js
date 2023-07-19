//Purpose: Creator for actions related to stores. Imported StoreService to make async HTTP requests with trigger dispatch on the result

// import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useFetchWrapper from '../helpers/FetchWrapper';

function useStoreActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/stores`;
  const fetchWrapper = useFetchWrapper();

  const navigate = useNavigate();

  return {
    getAll,
    getAllCount,
    getOne,
    add,
    update,
    remove,
    getProducts,
    getProductsCount,
    sync,
    getOneProduct,
  };

  async function getAll() {
    try {
      const stores = await fetchWrapper.get(baseUrl);
      return stores;
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function getAllCount() {
    try {
      const numStores = await fetchWrapper.get(`${baseUrl}/count`);
      return numStores;
    } catch (err) {
      console.log(err);
    }
  }

  async function getOne(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      const store = await fetchWrapper.get(overallRoute);
      return store;
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function add(store) {
    try {
      const new_store = await fetchWrapper.post(baseUrl, store);
      if (new_store) {
        toast.success('Store added!');
        navigate('/stores');
      } else {
        toast.error('Unsuccessful in adding store.');
      }
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function update(storeId, store) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      const update = await fetchWrapper.put(overallRoute, store);
      if (update) {
        toast.success('Successfully updated store!');
      } else {
        toast.error('Unsuccessful in updating store.');
      }
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function remove(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}`;
      await fetchWrapper.delete(overallRoute);
      navigate('/stores');
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function getProducts(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products`;
      const products = await fetchWrapper.get(overallRoute);
      return products;
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function getProductsCount(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products/count`;
      const numProducts = await fetchWrapper.get(overallRoute);
      return numProducts;
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function sync(storeId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products`;
      await fetchWrapper.post(overallRoute);
      toast.success('Successfully synced your products to this app!');
      navigate(`/stores/${storeId}/products`);
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function getOneProduct(storeId, productId) {
    try {
      const overallRoute = `${baseUrl}/${storeId}/products/${productId}`;
      const product = fetchWrapper.get(overallRoute);
      return product;
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }
}

export { useStoreActions };
