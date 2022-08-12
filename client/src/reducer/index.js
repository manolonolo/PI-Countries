const initialState = {
    countries: [],
    activities: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload
            }

        default:
            return state;
    }
}