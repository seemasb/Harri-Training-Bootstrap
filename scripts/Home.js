import loadCountries from './api.js'
import { renderCountries, renderFavList } from './rendering.js'
import { onSearch, onFilterChange, onDrop } from './events.js'
import { setInLocalStorage, getFromLocalStorage } from './localStorage.js'
import darkMode from './darkMode.js'
import { filterCountries } from './filteration.js'
import { findDroppedCountry, addDroppedCountry, removeFavCountry } from './favorites.js'

let FilterValue = '';
let countries = [];
let favouriteCountries = getFromLocalStorage('favList') || []


async function initlizer() {

    countries = await loadCountries();
    countriesCardsUpdate()
    renderFavList(favouriteCountries, removeFavBtnHandler)

    onSearch(async (searchQuery) => {
        countries = await loadCountries(searchQuery);
        countriesCardsUpdate()
    })

    onFilterChange((filter) => {
        FilterValue = filter;
        countriesCardsUpdate()
    })


    onDrop(addToFavHandler)

}

initlizer();
darkMode();

/////////////////////////view update/////////////////////////

let countriesCardsUpdate = () => {
    let filteredCountriesArray = filterCountries(countries, FilterValue, favouriteCountries)
    renderCountries(filteredCountriesArray, favouriteCountries, addToFavHandler, removeFavBtnHandler);
}

let favouritesUpdate = () => {
    setInLocalStorage('favList', favouriteCountries)
    renderFavList(favouriteCountries, removeFavBtnHandler)
}
//////////////////////////////////////////////////////////////



let addToFavHandler = (id) => {
    let droppedCountry = findDroppedCountry(countries, id);
    favouriteCountries = addDroppedCountry(droppedCountry, favouriteCountries)
    favouritesUpdate();
}

let removeFavBtnHandler = (countryCode) => {
    favouriteCountries = removeFavCountry(countryCode, favouriteCountries);
    favouritesUpdate()
}

