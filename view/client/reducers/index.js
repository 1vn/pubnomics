import { combineReducers } from 'redux';
import mainReducer from './main.js';
import uiReducer from './ui.js';
import searchReducer from './search.js';
import proteinReducer from './protein.js';

// empty reducer. COMMENT OUT WHEN YOU ADD YOUR OWN!
const initialState = (state = true, action) => {
  return state
}

/**
 * combineReducers is important to understand. As your app might grow in size
 * and complexity, you will likely begin to split your reducers into separate
 * functions - with each one managing a separate slice of the state! This helper
 * function from 'redux' simply merges the reducers. Keep in mind we are using
 * the ES6 shorthand for property notation.
 *
 * If you're transitioning from Flux, you will notice we only use one store, but
 * instead of relying on multiple stores to manage diff parts of the state, we use
 * various reducers and combine them.
 *
 * More info: http://rackt.org/redux/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
  initialState,
  mainReducer,
  uiReducer,
  searchReducer,
  proteinReducer,
});

export default rootReducer;