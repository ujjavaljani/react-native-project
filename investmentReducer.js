import * as actionTypes from './actionTypes';
import {_retrieveData, _storeData} from './utils/utility';

const initialState = {
  isLoggedIn: false,
  authData: null,
};
export default function InvestmentReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        authData: action.response,
      };

    case actionTypes.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authData: null,
      };
    case actionTypes.SET_USERDATA:
      return {
        ...state,
        ...action.response,
      };

    default:
      return state;
  }
}
