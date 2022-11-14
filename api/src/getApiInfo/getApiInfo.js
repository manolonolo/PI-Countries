const axios = require('axios');
const { Country } = require('../db');


const getApiInfo = async () => {
    try {       
        const apiUrl = await axios.get('https://restcountries.com/v3/all');
        const apiInfo = await apiUrl.data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                image: country.flags[0],
                continent: country.region,
                capital: country.capital ? country.capital[0] : 'Capital not found',
                area: country.area ? country.area : 'Area not found',
                subregion: country.subregion ? country.subregion : 'Subregion not found',
                population: country.population,
                fifa: country.fifa ? country.fifa : 'Not fifa'
            };
        });
        await Country.bulkCreate(apiInfo)
        console.log('Api loaded to DB')
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getApiInfo
};