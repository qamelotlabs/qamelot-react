import { Axios } from '../../../core/axios';
import * as actions from '../../actions';


export const setWalletAddress = (address) => async (dispatch) =>  {
    console.log("thunk",address);
  dispatch(actions.user.request(true));
  try {
    let param = address;
    let filter = 'wallet=' + param;
    const data = await Axios.get(`${process.env.REACT_APP_COLLECTION_API_URL}?${filter}`, {
      params: {} 
    });
    dispatch(actions.user.request(false));
    dispatch(actions.user.success(data.data));
  } catch (err) {
    dispatch(actions.user.request(false));
    dispatch(actions.user.failure(err));
  }
};