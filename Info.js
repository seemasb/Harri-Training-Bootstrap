async function initlize() {
    let queryString = location.search.substring(1);
    const InfoUrl = 'https://restcountries.com/v3.1/name/' + queryString;
    let Country = [];

    Country = await loadCounty(InfoUrl);
    console.log(Country)
    renderCountryDetails(Country);

}

async function loadCounty(InfoUrl) {
    const response = await fetch(InfoUrl);
    const CountryData = await response.json();
    return CountryData;
}


function renderCountryDetails(Country) {
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

initlize();


/////////////////////////////////////DARK MODE////////////////////////////////////////////////

    var storedTheme = localStorage.getItem('theme');
    if (storedTheme === "dark") darkModeToggle.innerHTML = '<i class="fa-solid fa-sun fa-lg"></i> <span>Light Mode</span>';
    document.documentElement.setAttribute('data-theme', storedTheme)

    // When someone clicks the button
    darkModeToggle.addEventListener('click', () => {
        var currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {
            targetTheme = "dark";
            darkModeToggle.innerHTML = '<i class="fa-solid fa-sun fa-lg"></i> <span>Light Mode</span>';
        }
        else {
            targetTheme = "light";
            darkModeToggle.innerHTML = '<i class="fa-regular fa-moon fa-lg SearchIcon"></i> <span>Dark Mode</span>';
        }

        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme);
    })