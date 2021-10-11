import {combineReducers} from 'redux';

// import all reducers
import {homeReducer} from './home';

export default combineReducers({
  home: homeReducer,
});
