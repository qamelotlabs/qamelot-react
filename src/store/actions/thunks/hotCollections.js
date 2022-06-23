import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    let filter = collectionId ? 'id='+collectionId : '';
    const { data } = await Axios.get(`${process.env.REACT_APP_COLLECTION_API_URL + api.hotCollections}?${filter}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
