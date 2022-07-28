//The history helper creates the browser history object used by the React + Recoil app, it is passed to the Router component in the main index.js file and enables us to access the history object outside of react components, for example from the logout() method of the user actions.

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export { history };
