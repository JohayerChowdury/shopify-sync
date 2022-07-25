//Purpose: Creator for actions related to stores. Imported StoreService to make async HTTP requests with trigger dispatch on the result

import {
  ADD_STORE,
  RETRIEVE_STORES,
  UPDATE_STORE,
  DELETE_STORE,
} from './types';
import StoreService from '../services/StoreService';

export const addStore =
  (
    nameFromInput,
    urlFromInput,
    access_tokenFromInput,
    storeIdFromInput,
    addressFromInput
  ) =>
  async (dispatch) => {
    try {
      let store = {
        name: nameFromInput,
        url: urlFromInput,
        access_token: access_tokenFromInput,
        storeId: storeIdFromInput,
        address: addressFromInput,
      };
      const res = await StoreService.add({ store: store });
      dispatch({ type: ADD_STORE, payload: res.data });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveStores = () => async (dispatch) => {
  try {
    const res = await StoreService.getAll();
    dispatch({ type: RETRIEVE_STORES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
export const updateStore = (store) => async (dispatch) => {
  try {
    const res = await StoreService.update(store);
    dispatch({ type: UPDATE_STORE, payload: res.data });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteStore = (store) => async (dispatch) => {
  try {
    await StoreService.delete(store);
    dispatch({ type: DELETE_STORE, payload: store });
  } catch (err) {
    console.log(err);
  }
};
