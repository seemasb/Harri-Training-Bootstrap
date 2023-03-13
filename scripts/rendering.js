const CardContainer = document.getElementById('CardsContainer');

function addDragListener(country) {
    return (event) => {
        event.dataTransfer.setData("text", country.cca2);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function renderCountries(countries, favouriteCountries, addToFavHandler, removeFavBtnHandler) {

    CardContainer.innerHTML = '';
    let favCountriesCodesList = []
    favouriteCountries.map((favItem) => favCountriesCodesList.push(favItem.cca2))

    countries ? (
        countries.forEach(country => {

            const CountryFlagImg = country.flags.svg;
            const CountryName = country.name.common;
            const Population = country.population;
            const Region = country.region;
            const Capital = country.capital;

            let countryElement = document.createElement('div');
            countryElement.classList.add('col-lg-4', 'col-md-6', 'col-sm-6', 'mh-75')

            countryElement.innerHTML +=
                `
                      <a href="Info.html?${CountryName}" id="${country.cca2}" class="card h-100" draggable="true">
                        <img src=${CountryFlagImg} class="card-img-top" alt=${CountryName} draggable="false">
                        <div class="card-body">

                            <span class="card-title country_name">${CountryName}</span>            
                            <div class="CountryInfo">
                                <span><span class="semiBold">Population: </span>${Population.toLocaleString('en-US')}</span>
                                <span><span class="semiBold">Region: </span>${Region}</span>
                                <span><span class="semiBold">Capital: </span>${Capital}</span>
                            </div>
                            <div class="mt-4">
                                <button class="StarBtn  ${(favCountriesCodesList.includes(country.cca2)) ? 'SelectedStarBtn' : 'NotSelectedStarBtn'}"><i class="fa-solid fa-star"></i></button>
                            </div> 
                        </div>
                      </a>
              `;

            countryElement.addEventListener('dragstart', addDragListener(country))

            let toggleFavBtn = countryElement.querySelector('button');
            toggleFavBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (toggleFavBtn.classList.contains('SelectedStarBtn')) {
                    removeFavBtnHandler(country.cca2)
                    toggleFavBtn.classList.remove('SelectedStarBtn');
                    toggleFavBtn.classList.add('NotSelectedStarBtn');
                }
                else {
                    addToFavHandler(country.cca2)
                    toggleFavBtn.classList.remove('NotSelectedStarBtn');
                    toggleFavBtn.classList.add('SelectedStarBtn');
                }
            })
            CardContainer.appendChild(countryElement)


        })) : CardContainer.innerHTML = 'Not found'
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function renderFavList(FavArray, removeFavBtnHandler) {
    let FavCountriesDiv = document.getElementById('FavList');
    FavCountriesDiv.innerHTML = '';

    for (let favItem of FavArray) {
        const FavItemDiv = document.createElement("div");
        FavItemDiv.setAttribute("id", favItem.cca2);
        FavItemDiv.setAttribute("class", "py-1");
        FavItemDiv.innerHTML +=
            `
                <img class="flagFav rounded" src=${favItem.flags.svg}>
                <span class="FavItemTitle">${favItem.name.common}</span>
                <button class="FavItemRemove">x</button>
              `;
        FavItemDiv.querySelector('button').addEventListener('click', () => {
            removeFavBtnHandler(favItem.cca2)
        })
        FavCountriesDiv.appendChild(FavItemDiv)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


export default function renderCountryDetails(Country) {
    const InfoContainer = document.getElementById('InfoContainer');
    let InfoContent = '';

    const CountryFlagImg = Country[0].flags.svg;
    const CountryName = Country[0].name.common;
    const Population = Country[0].population;
    const Region = Country[0].region;
    const SubRegion = Country[0].subregion;
    const Capital = Country[0].capital;
    const Currency = Country[0].currencies;
    const Languages = Country[0].languages;
    let ArrayLanguages = [];
    let ArrayCurrency = [];

    for (let x in Currency) {
        ArrayCurrency.push(Currency[x].name)
    }
    for (let x in Languages) {
        ArrayLanguages.push(Languages[x])
    }


    InfoContent =
        `
                <div class="col-lg-6 col-md-7 col-sm-12">
                <img src="${CountryFlagImg}" alt="Germany" class="InfoImg w-100 h-100" >
            </div>
            <div class="col-lg-6 col-sm-12">
                

                <div class="CountryDetails">
                    <span class="Info_country_name">${CountryName}</span>  
      
      
                    <div class="CountryDetails12">
                      <div class="CountryDetails1">
                          <span><span class="semiBold">Native Name: </span>${CountryName}</span>
                          <span><span class="semiBold">Population: </span>${Population.toLocaleString('en-US')}</span>
                          <span><span class="semiBold">Region: </span>${Region}</span>
                          <span><span class="semiBold">Sub Region: </span>${SubRegion}</span>
                          <span><span class="semiBold">Capital: </span>${Capital}</span>
                      </div>
                      <div class="CountryDetails2">
                          <span><span class="semiBold">Top Level Domain: </span>be</span>
                          <span><span class="semiBold">Currencies: </span>${ArrayCurrency.join(", ")}</span>
                          <span><span class="semiBold">Languages: </span>${ArrayLanguages.join(", ")}</span>
                      </div>
                    </div>
      
      
                    <div class="borders">
                      <span class="semiBold" style="padding-top: 5px; font-size: 16px;">Border Countries:</span>
                      <div>
                          <span class="CountryBox">French</span>
                          <span class="CountryBox">Germany</span>
                          <span class="CountryBox">Netherlands</span>
                      </div>
                    </div>
                  </div>


                </div>
              `;

    InfoContainer.innerHTML += InfoContent;


}