
export let findDroppedCountry = (countries, id) => {
    return (countries.find((country) => country.cca2 == id));
}

export let addDroppedCountry = (droppedCountry, favouriteCountries) => {
    let addedFavouriteCountries = [...favouriteCountries, droppedCountry]
    return [...new Set(addedFavouriteCountries)]

}

export let removeFavCountry = (countryCode, favouriteCountries) => {
    let removedFavCountry = favouriteCountries.filter((country) => country.cca2 != countryCode);
    return removedFavCountry
}