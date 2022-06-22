import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  loadingData: false,
  getNFTsByFilter: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getCollectionList.request):
      return { ...state, loadingData: action.payload };
    case getType(actions.getCollectionList.success):
      return { ...state, getNFTsByFilter: entityLoadingSucceeded(state.getNFTsByFilter, action.payload) };
    case getType(actions.getCollectionList.failure):
      return { ...state, getNFTsByFilter: entityLoadingFailed(state.getNFTsByFilter) };

    default:
      return state;
  }
};

export default states;
