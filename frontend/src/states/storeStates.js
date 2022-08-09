import { atom } from 'recoil';

export const storeAtom = atom({
  key: 'store',
  default: null,
});

export const storesAtom = atom({
  key: 'stores',
  default: [],
});
