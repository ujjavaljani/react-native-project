import {createStore, applyMiddleware, combineReducers} from 'redux';
import investmentReducer from './investmentReducer';
import {createLogger} from 'redux-logger';

export default function configureStore(initialState = {}) {
  // const userPref = await _retrieveData();
  // console.log('userPref in index', userPref);
  const allReducers = combineReducers({
    Auth: investmentReducer,
  });
  initialState = {Auth: {isLoggedIn: true, authData: {}}};
  const logger = createLogger();
  const middleware = applyMiddleware(logger);
  return createStore(allReducers, initialState, middleware);
}
