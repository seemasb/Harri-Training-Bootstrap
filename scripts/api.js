
let activeRequestCounter = 0;

export default async function loadCountries(searchBarValue) {
    let url = searchBarValue ? 'https://restcountries.com/v3.1/name/' + searchBarValue : 'https://restcountries.com/v3.1/all'
    activeRequestCounter++;
    let request = activeRequestCounter;

    const response = await fetch(url);
    const CountriesData = await response.json();
    if (request === activeRequestCounter) {
        return CountriesData;

    }
    else {
        return [];
    }
}