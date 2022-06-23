import { Axios } from '../../../core/axios';

export const postContactForm = (form) => async () => {
    try {
        const { data } = await Axios.post(`${process.env.REACT_APP_COLLECTION_API_URL}${api.contactUs}`, form);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};