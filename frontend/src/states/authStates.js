import {atom} from 'recoil';

export const authAtom = atom({
    key: 'auth',
    default: JSON.parse(localStorage.getItem('user'))
})