const BASE_URL = 'https://restcountries.com/v3.1/';
const requestParameters = '?fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
    return fetch(`${BASE_URL}name/${name}${requestParameters}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('country not found');
          }    
    return response.json();
    });
}