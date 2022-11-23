import axios from 'axios';

export const getAllCountries= () => async(dispatch) => {
    return await axios.get('http://localhost:3001/countries')
    .then((info) => dispatch({type: 'GET_ALL_COUNTRIES', payload: info.data}))
    .catch((error) => console.log(error));
};

export const getActivity= () => (dispatch) => {
    return axios.get(`http://localhost:3001/activity/all`)
    .then((info) => dispatch({type: 'GET_ACTIVITY', payload: info.data}))
    .catch((error) => console.log(error))
};

export function postActivity(body) {
    return async function(dispatch) {
        try {    
            var activity = await axios.post(`http://localhost:3001/activity`, body);
            return dispatch({
                type: 'POST_ACTIVITY',
                payload: activity.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterActivity(activity){
    return {
        type: 'FILTER_ACTIVITY',
        payload: activity
    }
}

export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}
