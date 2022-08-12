const { Router } = require('express');
const { Country, Activity } = require('../db');
require('dotenv').config();
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map( el => {
        return {
            id: el.cca3,
            name: el.name.common,
            flagImg: el.flags ? el.flags[1] : 'Invalid flag',
            continent: el.continents ? el.continents[0] : 'Not a continent' ,
            capital: el.capital ? el.capital[0] : 'Not a capital',
            subregion: el.subregion,
            area: el.area,
            population: el.population
        }
    });
    return apiInfo;
}

const getDbInfo = async() => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
}

router.get('/countries', async(req, res) => {
    
    const countries = await getApiInfo();
    //res.send(countries);
    
    await Country.bulkCreate(countries);
    /*
    countries.forEach( (el) => { //probar .map
        Country.findOrCreate({ //probar bulkCreate
            where: {
                name: el.name
            }
        })
    });
    */

    const allCountries = await Country.findAll();
    res.send(allCountries);
});

router.get('/countries/{idPais}', async(req, res) => {
    const countryDetail = getDbInfo(); //esto trae los datos necesarios + las activities
    res.send(countryDetail);
});

router.get('/countries?name="..."', async(req, res) => { //esta es la ruta de búsqueda en la searchBar. Devuelve las cards que matcheen el name pasado por query (params?).
    const name = req.query.name;
    let allCountries = await Country.findAll();
    let countryName = await allCountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) );
    countryName.length ? res.status(200).send(countryName) : res.status(404).send('No se ha encontrado un país que coincida con los parámetros de búsqueda.');
});

router.post('/activities', async(req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    const newActivity = await Activity.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    });

    let countryDb = Country.findAll({
        where: {
            name: countries
        }
    })

    newActivity.addCountry(countryDb);
    res.send('Activity creada con éxito.');
});

module.exports = router;
