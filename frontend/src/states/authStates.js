import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  //get initial state from local storage to enable user to stay logged in
  // default: () => {
  //   try {
  //     JSON.parse(localStorage.getItem('user'));
  //   } catch (err) {
  //     console.log('Error: ', err.message);
  //   }
  // },
  default: JSON.parse(localStorage.getItem('user')),
  // default: { loggedIn: false, username: '' },
});
