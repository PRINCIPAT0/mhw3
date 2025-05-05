    const allImages = document.querySelectorAll("#favorite_films_list img, #recent_activity_list img");
  
    const fullscreenView = document.querySelector("#fullscreen_view");
    const fullscreenImg = document.querySelector("#fullscreen_img");
  
    function showFullscreen(event) {
      if (event.target.tagName === "IMG") { 
        fullscreenImg.src = event.target.src; 
        fullscreenView.classList.remove("hidden");  
      }
    }
  
    function closeFullscreen() {
      fullscreenView.classList.add("hidden");
      fullscreenImg.src = "";
    }
  
    for (let i = 0; i < allImages.length; i++) {
      const img = allImages[i];
      img.addEventListener("click", showFullscreen);
    }
  
    fullscreenView.addEventListener("click", closeFullscreen);
  
  /*--------------------------------------------------------*/
 
const navbarProfile = document.querySelector("#navbar_profile");

function createDropdown() {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-menu");

    const items = [
        "Home", "Profile", "Films", "Diary", "Reviews", 
        "Watchlist", "Lists", "Likes", "Tags", "Network", 
        "Settings", "Subscription", "Sign out"
    ];

    for (let i = 0; i < items.length; i++) {
        const item = document.createElement("div");
        item.textContent = items[i];
        dropdown.appendChild(item);
    }

    navbarProfile.appendChild(dropdown);
}

function removeDropdown() {
    const dropdown = navbarProfile.querySelector(".dropdown-menu");
    if (dropdown) {
        dropdown.remove();
    }
}

function handleMouseOver() {
    if (!navbarProfile.querySelector(".dropdown-menu")) {
        createDropdown();
    }
}

function handleMouseOut() {
    removeDropdown();
}

navbarProfile.addEventListener("mouseover", handleMouseOver);

navbarProfile.addEventListener("mouseout", handleMouseOut);

/*--------------------------------------------------------*/

const searchIcon = document.querySelector('#icona_ricerca');
const searchBox = document.querySelector('#search_box');
const submit = document.querySelector('#submit');  

let isSearchBoxVisible = false;  
  
function toggleSearchBox() {
    if (isSearchBoxVisible) {
        searchBox.classList.remove('show');
        submit.classList.remove('show');  
    } else {
        searchBox.classList.add('show'); 
        submit.classList.add('show');
    }
  
    isSearchBoxVisible = !isSearchBoxVisible;  
}
  
searchIcon.addEventListener('click', toggleSearchBox);

/*--------------------------------------------------------*/

function onJson(json) {
    console.log('JSON ricevuto');
    const film_list = document.querySelector('#film_list_view');
    film_list.innerHTML = '';
  
    const overlay = document.querySelector('#overlay');
    overlay.classList.remove('hidden');
  
    for (let i = 0; i < json.description.length; i++) {
      const type = json.description[i].type;
      if (type === 'MOVIE') {
      
        const doc = json.description[i];
        const title = doc.title;
        console.log(title);
  
        const cover_url = doc.photo_url;
  
        const movie = document.createElement('div');
        movie.classList.add('movie');
  
        const img = document.createElement('img');
        img.src = cover_url[0];
  
        const caption = document.createElement('span');
        caption.textContent = title;
  
        movie.appendChild(img);
        movie.appendChild(caption);
        film_list.appendChild(movie);
      }
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function search(event) {
  event.preventDefault();

  const film_input = document.querySelector('#search_box');
  const film_value = encodeURIComponent(film_input.value);
  console.log('Eseguo ricerca: ' + film_value);

  rest_url = 'https://imdb.iamidiotareyoutoo.com/justwatch?q=' + film_value;
  console.log('URL: ' + rest_url);

  fetch(rest_url).then(onResponse).then(onJson);
 
}

function closeOverlay() {
  const overlay = document.querySelector('#overlay');
  overlay.classList.add('hidden');
}

const form = document.querySelector('form');
form.addEventListener('submit', search);

document.querySelector('#close_overlay').addEventListener('click', closeOverlay);
  
/*--------------------------------------------------------*/

function onJson1(json) {
  console.log('JSON ricevuto');
  console.log(json);

  const poster = json.poster_url;
  const title = json.title;
  const days = json.days_until;
  const release_date = json.release_date;

  const marvelPosterContainer = document.querySelector('#marvel_poster');
  const daysUntilElement = document.querySelector('#days_until');

  marvelPosterContainer.innerHTML = '';

  const img = document.createElement('img');
  img.src = poster;
  img.id = 'mcu_poster';

  const titleSpan = document.createElement('span');
  titleSpan.textContent = title + " " + release_date;
  titleSpan.id = 'marvel_title';

  marvelPosterContainer.appendChild(img);
  marvelPosterContainer.appendChild(titleSpan);

  daysUntilElement.textContent = days + " days to go";
}


function onResponse1(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search1(event) {

  event.preventDefault();

  rest_url1 = 'https://www.whenisthenextmcufilm.com/api';
  console.log('URL: ' + rest_url1);
  fetch(rest_url1).then(onResponse1).then(onJson1);

}

const marvel = document.querySelector('#marvel');
    marvel.addEventListener('click', search1);

