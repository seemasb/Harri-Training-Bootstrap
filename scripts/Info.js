import darkMode from './darkMode.js'
import renderCountryDetails from './rendering.js'
import loadCountries from './api.js'


async function initlize() {
    let queryString = location.search.substring(1);
    let Country = [];

    Country = await loadCountries(queryString);
    renderCountryDetails(Country);
}

initlize();
darkMode();
