import { atom } from 'recoil';
//atom in Recoil is an isolated piece of memory that holds data
//when some data changes in atom, the change will re-render components to or using that atom
//recoil makes sure that only those components are being re-rendered that are subscirbed to that specific atom

const userAtom = atom({
  key: 'user',
  default: null,
});

const usersAtom = atom({
  key: 'users',
  default: [],
});

export { userAtom, usersAtom };
