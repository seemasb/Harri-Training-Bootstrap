
///////////////////////////////////////////////////////////////////////////////////////////////////////
  // const url = 'https://restcountries.com/v3.1/alpha?codes=de,us,br,is,af,al,ax,dz'
  const url = 'https://restcountries.com/v3.1/all'
  const urlByName = 'https://restcountries.com/v3.1/name/'
  const CardContainer = document.getElementById('CardsContainer');
  const SearchBar = document.getElementById('SearchBar');
  const Dropdown = document.getElementById('Dropdown');
  var DropDownValue = '';

  Dropdown.addEventListener('click', function handleChange(event) {
  // console.log("hi")
  console.log(event.target.text); 
  DropDownValue = event.target.text;
  // DisplayCards()
});

// Dropdown.click((e)=>{
//   console.log("hi")
// })

  SearchBar.addEventListener("keyup",()=>{
    // console.log(SearchBar.value);
          fetch(urlByName+SearchBar.value)
          .then((response) => response.json())
          .then((data) => { 
            if(!SearchBar.value) getData();  //to handle the case when deleting the search value
            else {
              // console.log(data); 
              DisplayCards(data); 
                  }
          
          });

          
  });

  function DisplayCards(array){
    console.log(DropDownValue)
    console.log("im in display cards")
    const CardContainer = document.getElementById('CardsContainer');
    CardContainer.innerHTML = '';
    var CardContent = '';
    let darkMode = localStorage.getItem('darkMode');
    
    // if (darkMode === 'enabled') {
    //   darkCardClass = 'darkmodeCard';
    // }
    // else{
    //   darkCardClass = '';
    // }
    // console.log(array);
    for (let i = 0; i < array.length; i++) {
              // console.log(array[i]);
              const CountryFlagImg = array[i].flags.svg;
              const CountryName = array[i].name.common;
              const Population = array[i].population;
              const Region = array[i].region;
              const Capital = array[i].capital;

              // if(DropDownValue != '' && array[i].region == DropDownValue){
              //     //take the element
              // }

              CardContent =
                `
                <div class="col-lg-3 col-md-4 col-sm-6">
                      <a href="Info.html?${CountryName}" class="card h-100 shadow-sm " id="Card">
                        <img src=${CountryFlagImg} class="card-img-top" alt=${CountryName}>
                        <div class="card-body">

                          <span class="card-title country_name">${CountryName}</span>            
                        <div class="CountryInfo">
                            <span><span class="semiBold">Population: </span>${Population}</span>
                            <span><span class="semiBold">Region: </span>${Region}</span>
                            <span><span class="semiBold">Capital: </span>${Capital}</span>

                        </div>
                        </div>
                      </a>
                    </div>
              `;

              // if(CardContainer == ''){
              //   console.log("no result")
              //   CardContainer.innerHTML = '<div>No results found</div>'
              // }
              // else{
                CardContainer.innerHTML += CardContent;
              // }

          }

          if(CardContainer == ''){
                console.log("no result")
                CardContainer.innerHTML = '<div>No results found</div>'
              }
              


          if (darkMode == 'enabled') {
          console.log("im in if")
          enableDarkMode();
        }

  }


  async function getData() { 
    console.log("I'm in get data")
          await fetch(url)
          .then((response) => response.json())
          .then((data) => {console.log(data); console.log("end of get data") ; DisplayCards(data)});
          // const data = await resp.json();
          // console.log(data);
          // console.log("end of get data") ;
          // DisplayCards(data)
  }
  getData();
/////////////////////////////////////////////////////////////////////////////////////



// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode'); 
console.log("dark mode is: ")
console.log(darkMode)

const darkModeToggle = document.getElementById('darkModeToggle')

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmodeBody');
  var arr = document.getElementsByClassName('card');
  console.log("array of cards: ")
  console.log(arr)

  for(let i = 0; i<arr.length ; i++){
    // document.getElementById('Card').classList.add('darkmodeCard');
    // arr[i].classList.value += ' darkmodeCard'
    arr[i].classList.value = 'card h-100 darkmodeCard darkmodeShadow'
    console.log(arr[i].classList.value)

  }
  // document.getElementsByClassName('card').map(element =>{
  //   element.classList.add('darkmodeCard');
  // })


  document.getElementById('Header').classList.add('darkmodeHeader');
  document.getElementById('Header').classList.remove('shadow-sm');
  document.getElementById('Header').classList.add('darkmodeShadow');
  document.getElementById('darkModeToggle').classList.add('darkmodeToggleBtn');
  document.getElementById('SearchIcon').classList.remove('search');
  document.getElementById('SearchIcon').classList.add('darkmodeSearchIcon');
  document.getElementById('SearchBar').classList.remove('shadow-sm');
  document.getElementById('SearchBar').classList.add('darkmodeShadow');
  document.getElementById('SearchBar').classList.add('darkmodeSearchBar');
  document.getElementById('drop_list').classList.remove('drop_list');
  document.getElementById('drop_list').classList.add('darkmodedrop_list');
  document.getElementById('drop_list').classList.remove('shadow-sm');
  document.getElementById('drop_list').classList.add('darkmodeShadow');
  document.getElementById('DropMenu').classList.add('darkmodeDropMenu');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmodeBody');
  console.log("i'm in dis")
 
  var arr = document.getElementsByClassName('card');
  for(let i = 0; i<arr.length ; i++){
    // document.getElementById('Card').classList.add('darkmodeCard');
    arr[i].classList.value = 'card h-100 shadow-sm'
    console.log(arr[i].classList.value)

  }

  document.getElementById('Header').classList.remove('darkmodeHeader');
  document.getElementById('Header').classList.add('shadow-sm');
  document.getElementById('Header').classList.remove('darkmodeShadow');
  document.getElementById('darkModeToggle').classList.remove('darkmodeToggleBtn');
  document.getElementById('SearchIcon').classList.remove('darkmodeSearchIcon');
  document.getElementById('SearchIcon').classList.add('search');
  document.getElementById('SearchBar').classList.remove('darkmodeSearchBar');
  document.getElementById('SearchBar').classList.add('shadow-sm');
  document.getElementById('SearchBar').classList.remove('darkmodeShadow');
  document.getElementById('drop_list').classList.remove('darkmodedrop_list');
  document.getElementById('drop_list').classList.add('drop_list');
  document.getElementById('drop_list').classList.add('shadow-sm');
  document.getElementById('drop_list').classList.remove('darkmodeShadow');
  document.getElementById('DropMenu').classList.remove('darkmodeDropMenu');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode == 'enabled') {
  console.log("im in if")
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});
