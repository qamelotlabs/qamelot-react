import { Axios } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

export const getNFTsByFilter = (filterData) => async (dispatch) =>  {
  dispatch(actions.getCollectionList.request(true));
    var config = {
      headers: {'Access-Control-Allow-Origin': 'http://qamelot.coming-soon.xyz/'}
    }
  try {
    let param = filterData;
    let filter = 'timeRange=' + param;
    const data = await Axios.get(`${api.devUrl}?${filter}`, {
      params: {} 
    });
    dispatch(actions.getCollectionList.request(false));
    dispatch(actions.getCollectionList.success(data.data));
  } catch (err) {
    dispatch(actions.getCollectionList.request(false));
    dispatch(actions.getCollectionList.failure(err));
  }
};