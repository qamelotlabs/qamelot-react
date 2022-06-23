import { Axios } from '../../../core/axios';
import * as actions from '../../actions';

export const getNFTsByFilter = (filterData) => async (dispatch) =>  {
  dispatch(actions.getCollectionList.request(true));
    var config = {
      headers: {'Access-Control-Allow-Origin': process.env.REACT_APP_COLLECTION_API_URL}
    }
  try {
    let param = filterData;
    let filter = 'timeRange=' + param;
    const data = await Axios.get(`${process.env.REACT_APP_COLLECTION_API_URL}?${filter}`, {
      params: {} 
    });
    dispatch(actions.getCollectionList.request(false));
    dispatch(actions.getCollectionList.success(data.data));
  } catch (err) {
    dispatch(actions.getCollectionList.request(false));
    dispatch(actions.getCollectionList.failure(err));
  }
};