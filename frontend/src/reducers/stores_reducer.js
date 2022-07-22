import {
  ADD_STORE,
  RETRIEVE_STORES,
  UPDATE_STORE,
  DELETE_STORE,
} from '../actions/types';

const initialState = [];

function storeReducer(stores = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_STORE:
      return [...stores, payload];
    case RETRIEVE_STORES:
      return payload;
    case UPDATE_STORE:
      return stores.map((store) => {
        if (store.storeId === payload.storeId) {
          return {
            ...store,
            ...payload,
          };
        } else {
          return store;
        }
      });
    case DELETE_STORE:
      return stores.filter(({ storeId }) => storeId !== payload.storeId);
    default:
      return stores;
  }
}
export default storeReducer;
