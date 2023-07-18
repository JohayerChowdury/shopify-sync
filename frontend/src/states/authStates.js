import { atom } from 'recoil';

export const authAtom = atom({
  key: 'authorization',
  default: JSON.parse(localStorage.getItem('user')),
});
