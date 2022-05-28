import {fetchCountries} from './js-modules/fetch-countries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryCardTpl from './templates/country-card-tpl.hbs';
import countryCardMinTpl from './templates/country-card-min-tpl.hbs';
import './css/styles.css';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput () {
    const userInput = refs.input.value.trim();
    if (userInput === '') {
        clearCountriesList(); 
        return;
    }

    fetchCountries(userInput)
    .then(handleResult)
    .catch(handleError);
}

function renderCountriesList (values, template, target) {
    const markup =  values.map(element => template(element)).join('');
    target.innerHTML = markup;
}

function handleResult (result) {
    clearCountriesList();
    if (result.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }


    if (result.length === 1) {
        renderCountriesList(result, countryCardTpl, refs.info);
        return;
    }

    renderCountriesList(result, countryCardMinTpl, refs.list);
}

function handleError(error) {
    if (error.message === 'country not found') {
        Notify.failure('Oops, there is no country with that name');
        clearCountriesList();
    }
    else {
        console.log(error);
    }
}

function clearCountriesList () {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}