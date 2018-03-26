const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();
const expressLess = require('express-less');

app.use('/js', express.static(path.join(__dirname, 'js/dist')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/css', expressLess(path.join(__dirname, 'less')));

app.get('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/all', (request, response) => {

    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=802';

    axios.get(apiUrl)
        .then(apiResponse => {
            var pokemonList = apiResponse.data.results;

            //map results to get pokemon numbers and images
            apiResponse.data.results = pokemonList.map(entry => {
                var urlSplit = entry.url.split('/');
                var number = urlSplit.filter(e => e.length > 0).pop();

                entry.number = number;
                entry.imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + number + '.png';

                return entry;
            });
            
            response.send(apiResponse.data);
        })
        .catch(error => {
            console.log(error);
            response.send(apiResponse.data);
        });
});

app.listen(3030, () => {
    console.log('pokelist server listening on port 3030');
});