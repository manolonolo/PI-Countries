const initialState = {
    countries: [],
    allCountries: [],
    activities: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
  

        default:
            return state;
    }
}

export default rootReducer;