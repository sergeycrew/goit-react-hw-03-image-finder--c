
import axios from 'axios';
import PropTypes from 'prop-types';


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22776346-27604cb5f05d7a9bd9b9b05dd';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const api = async ({ query, currentPage }) => {
  try {
    const response = await axios.get('', {
      params: { q: query, page: currentPage },    // custom params in object
    });
    console.log(response)
    return response.data.hits;
  } catch (error) {
    console.log('error', { error });
    return [];
  }
};

api.propTypes = {
  query: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired
}


