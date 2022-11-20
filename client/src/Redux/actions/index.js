import axios from 'axios';

export const getAllCountries= () => async(dispatch) => {
    return await axios.get('http://localhost:3001/countries')
    .then((info) => dispatch({type: 'GET_ALL_COUNTRIES', payload: info.data}))
    .catch((error) => console.log(error));
};