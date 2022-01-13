import { combineReducers } from 'redux';

import { destinationsAPI } from '../service/destinations';

const reducers = combineReducers({
  [destinationsAPI.reducerPath]: destinationsAPI.reducer,
});


export default reducers;
