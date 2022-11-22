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

        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const statusFiltered = action.payload === 'All'?
            allCountries:
            allCountries.filter(c => c.continent === action.payload)
            console.log(statusFiltered)
            return {
                ...state,
                countries: statusFiltered
            };
        
        case 'ORDER_BY_NAME':
            const countriesByName = action.payload === 'asc'?
            state.countries.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }):
            state.countries.sort((a, b) => {
                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;
                return 0;
            })
            console.log(countriesByName);
            return {
                ...state,
                countries: countriesByName
            };

        case 'ORDER_BY_POPULATION':
            const countriesByPopulation = action.payload === 'population asc'
            ? state.countries.sort((a, b) => a.population - b.population)
            : state.countries.sort((a, b) => b.population - a.population)
            console.log(countriesByPopulation);
            return {
                ...state,
                countries: countriesByPopulation
            };

        default:
            return state;
    }
}

export default rootReducer;