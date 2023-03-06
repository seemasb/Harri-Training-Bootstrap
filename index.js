////////////////////////////////////////////Declare Variables/////////////////////////////////////////////

let activeRequestCounter = 0;

////////////////////////////////////////////Query dom elements/////////////////////////////////////////////

const CardContainer = document.getElementById('CardsContainer');
const SearchBar = document.getElementById('SearchBar');
const RegionFiltered = document.getElementById('RegionFiltered');
const darkModeToggle = document.getElementById('darkModeToggle')

////////////////////////////////////////////On Search Debounce/////////////////////////////////////////////

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

////////////////////////////////////////////initlize/////////////////////////////////////////////

initlize();

async function initlize() {
    let DropDownFilter = '';
    let countries = [];
    const url = 'https://restcountries.com/v3.1/all'
    const urlByName = 'https://restcountries.com/v3.1/name/'
    const FavKey = 'FavListArray'

    countries = await loadCountries(url);
    renderCountries(filterCountries(countries, DropDownFilter));
    DisplayFavController()

    onFilterChange((filter) => {
        DropDownFilter = filter;
        renderCountries(filterCountries(countries, DropDownFilter))
    })

    onSearch(async () => {
        let SearchBarUrl = (SearchBar.value ? (urlByName + SearchBar.value) : url); ntries(SearchBarUrl);
        renderCountries(filterCountries(countries, DropDownFilter));
    })

    OnWindowResize()

}

////////////////////////////////////////////Functions/////////////////////////////////////////////

function OnWindowResize() {
    window.addEventListener("resize", () => {
        DisplayFavController();
    });
}

function DisplayFavController() {
    const FavList = document.getElementById('FavSection');
    const StarBtn = document.getElementsByClassName('StarBtn');
    if (screen.width < 800) {
        for (x of StarBtn) x.style.display = "block";
        FavList.style.display = "none";
    }
    else {
        for (x of StarBtn) x.style.display = "none";
        FavList.style.display = "block";
        renderFavList(getFromLocalStorage('FavListArray'))
    }
}

function onFilterChange(cb) {
    document.getElementById('DropMenu').addEventListener("click", function handleChange(e) {
        filter = e.target.text;
        if (filter == "No Filter") {
            RegionFiltered.innerHTML = "Filter by"
        }
        else {
            RegionFiltered.innerHTML = filter;
        }
        cb(filter);
    });
}

function onSearch(cb) {
    document.getElementById('SearchBar').addEventListener("keyup", function handleChange(e) {
        debounce(cb());
    })
}



async function loadCountries(url) {
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



function filterCountries(countries, filter) {
    let FilteredCountries = [];


    if (filter == '' || filter == "No Filter") {
        return countries;
    }
    else if (filter == "Favorite") {
        let FavCountries = getFromLocalStorage('FavListArray');
        let favCountriesList = [];
        for (FavItem of FavCountries) {
            favCountriesList.push(FavItem.name)
        }
        for (let i = 0; i < countries.length; i++) {
            if (favCountriesList.includes(countries[i].name.common)) {
                FilteredCountries.push(countries[i]);
            }
        }
        return FilteredCountries;

    }
    else {
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].region == filter) {
                FilteredCountries.push(countries[i]);
            }
        }

        return FilteredCountries;
    }


}

function renderCountries(countries) {

    let CardContent = '';
    CardContainer.innerHTML = '';


    //////////////To select Fav button class based on checking if the country is favourite///////////////
    let FavCountries = getFromLocalStorage('FavListArray');
    let favCountriesList = [];
    if (FavCountries) {
        for (FavItem of FavCountries) {
            favCountriesList.push(FavItem.name)
        }
    }

    for (let i = 0; i < countries.length; i++) {
        const CountryFlagImg = countries[i].flags.svg;
        const CountryName = countries[i].name.common;
        const Population = countries[i].population;
        const Region = countries[i].region;
        const Capital = countries[i].capital;

        CardContent =
            `
                <div class="col-lg-4 col-md-6 col-sm-6 mh-75">
                      <a href="Info.html?${CountryName}" class="card h-100" id=${'Card' + i} draggable="true" ondragstart="drag(event)"  ondrag="dragging(event)">
                        <img src=${CountryFlagImg} class="card-img-top" alt=${CountryName} id=${'Card' + i + 'imgSrc'}>
                        <div class="card-body">

                            <span class="card-title country_name" id=${'Card' + i + 'Name'}>${CountryName}</span>            
                            <div class="CountryInfo">
                                <span><span class="semiBold">Population: </span>${Population.toLocaleString('en-US')}</span>
                                <span><span class="semiBold">Region: </span>${Region}</span>
                                <span><span class="semiBold">Capital: </span>${Capital}</span>
                            </div>
                            <div class="mt-4">
                            <button class="StarBtn" onclick="StarCountry(this)" id=${'Card' + i}><i id=${'Card' + i + 'Star'} class="fa-solid fa-star ${(favCountriesList.includes(CountryName)) ? 'SelectedStarBtn' : 'NotSelectedStarBtn'}"></i></button>
                            </div>
                        </div>
                      </a>
                    </div>
              `;


        CardContainer.innerHTML += CardContent;


    }

    DisplayFavController();

}



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


/////////////////////////////////////Drag////////////////////////////////////////////////

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id).classList.add('OnDragOpacity')
}


function drop(ev) {

    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    document.getElementById(data).classList.remove('OnDragOpacity')
    let FavItem = {
        name: document.getElementById(data + 'Name').innerText,
        imgSrc: document.getElementById(data + 'imgSrc').src,
    }

    setInLocalStorage('FavListArray', FavItem)
    renderFavList(getFromLocalStorage('FavListArray'))
}


function renderFavList(FavList) {
    let FavCountries = document.getElementById('FavList');
    FavCountries.innerHTML = '';

    for (favItem of FavList) {
        const FavItemDiv = document.createElement("div");
        FavItemDiv.setAttribute("id", favItem.name);
        FavItemDiv.setAttribute("class", "py-1");
        addedFavContent =
            `
                <img class="flagFav rounded" src=${favItem.imgSrc}>
                <span class="FavItemTitle">${favItem.name}</span>
                <button onclick="removeFromStorage('FavListArray' ,this.parentNode.id )" class="FavItemRemove">x</button>
              `;
        FavItemDiv.innerHTML = addedFavContent
        FavCountries.appendChild(FavItemDiv)
    }
}



function StarCountry(e) {
    let FavItem = {
        name: document.getElementById(e.id + 'Name').innerText,
        imgSrc: document.getElementById(e.id + 'imgSrc').src,
    }
    let StarBtn = document.getElementById(e.id + 'Star')

    if (StarBtn.classList.contains('SelectedStarBtn')) {
        StarBtn.classList.remove('SelectedStarBtn');
        StarBtn.classList.add('NotSelectedStarBtn');
        removeFromStorage('FavListArray', FavItem.name)
    }
    else if (StarBtn.classList.contains('NotSelectedStarBtn')) {
        StarBtn.classList.remove('NotSelectedStarBtn');
        StarBtn.classList.add('SelectedStarBtn');
        setInLocalStorage('FavListArray', FavItem)

    }
}

/////////////////////////////////////LocalStorage////////////////////////////////////////////////


let setInLocalStorage = function (key, value) {
    let existingList = localStorage.getItem(key);
    try {
        if (existingList) {
            const list = JSON.parse(existingList);
            let flagExist = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i].name == value.name) {
                    flagExist = true;
                    break;
                }
            }
            if (!flagExist) {
                list.push(value);
                localStorage.setItem(key, JSON.stringify(list));
            }
        } else {
            const list = [];
            list.push(value);
            localStorage.setItem(key, JSON.stringify(list));
        }
    } catch (e) {
        console.log(e, "add to storage failed");
    }
}


function removeFromStorage(key, value) {
    let existingList = localStorage.getItem(key);

    try {
        if (existingList) {
            const list = JSON.parse(existingList);
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i].name == value)
                    index = i;
            }
            if (index > -1) {
                list.splice(index, 1);
            }
            localStorage.setItem(key, JSON.stringify(list));
        }
    } catch (e) {
        console.log(e, "remove from storage failed");
    }
    renderFavList(getFromLocalStorage('FavListArray'))
}


let getFromLocalStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch {
        return undefined;
    }
}

