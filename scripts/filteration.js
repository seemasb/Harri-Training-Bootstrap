export function filterCountries(countries, filter, favouriteCountries) {

    if (filter == '' || filter == "No Filter") {
        return countries;
    }
    else if (filter == 'Favorite') {
        return favouriteCountries
    }
    else {
        return (countries.filter((item) => item.region == filter))
    }

}