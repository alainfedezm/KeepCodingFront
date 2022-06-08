import './main.scss';


//const constant = require('./constants.js');

//import constants, {newVariable} from './constants'
//console.log('esmodule', constants + newVariable)
const fromFile = 'Hello world!!!';
// Selectors
const items = document.querySelectorAll('.show-item');
const showItems = document.getElementsByClassName('show-item');
// document.getElementById

// console.log([...items]);
// console.log(showItems);
// const showItemsArray = [...showItems];

// items.forEach((item) => {
//   console.log(item.innerHTML);
// });

// showItemsArray.forEach((item) => {
//   console.log('showItemsArray item', item.innerHTML)
// });

const navbar = document.querySelector('.navbar');

console.log(navbar.innerText);
console.log(navbar.className);
// navbar.innerText = 'Texto desde <b>javascript</b>';
// navbar.innerHTML = 'Texto desde';
// navbar.className = navbar.className + ' nueva js-example';
navbar.classList.add('nueva');
navbar.classList.add('js-example');

setTimeout(() => {
  navbar.classList.toggle('js-example');
  navbar.classList.remove('nueva');
}, 2000);

setTimeout(() => {
  navbar.classList.toggle('js-example');
}, 5000);
const animeList = document.getElementById('anime-list');

const menuItems = [
  'Detective conan',
  'Full metal',
  'Kill la kill',
  'Shingeky no kiokin',
];

// 1. render list
const addMenuListItems = (list) => {
  const createMenuItem = (name) => {
    const li = document.createElement('li');
    li.textContent = name;
    return li;
  };
  list.forEach((menuItem) => {
    const liElement = createMenuItem(menuItem);
    animeList.appendChild(liElement);
  });
};

// addMenuListItems(menuItems);

// setTimeout(() => {
//   addMenuListItems(['k-on', 'bleach']);
// }, 3000);
// 2. render with innerHTML
const listTemplate = (title) => {
  return `<li>${title}</li>`;
};

const teamplateList = [...menuItems, 'evangelion'].map((menuItem) => {
  return listTemplate(menuItem);
}).join('');
// animeList.innerHTML = teamplateList;

// setTimeout(() => {
//   animeList.innerHTML = animeList.innerHTML + listTemplate('k-on');
// }, 3000);

// 3. template
const articleTemplate = document.querySelector('#article');
const mainListContent = document.getElementById('main-list-content');

const renderArticle = (name, url) => {
  // Esto renderizaba el template pero si quería añadir
  // otros articles no me dejaba
  // mainListContent.appendChild(articleTemplate.content);
  // para poder solucionarlo usamos ".cloneNode(true)"
  const clone = articleTemplate.content.cloneNode(true);
  const figCaption = clone.querySelector('figcaption');
  const img = clone.querySelector('img');
  figCaption.textContent = name;
  img.src = url;
  img.title = name;
  img.alt = name;
  mainListContent.appendChild(clone);
};

menuItems.forEach((item) => {
  animeList.innerHTML += '<li>' + item + '</li>'
});
// // renderizado innerHTML cada elemento
// setTimeout(() => {
//   menuItems.forEach((item) => {
//     animeList.innerHTML += `<li>${item}</li>`
//   });
// }, 3000);
/* --- render list --- */
const getAnimeListAPI = async (title) => {
  // GET
  let filter = '';
  if (title) {
    filter = `&title=${title}`;
  }
  // const response = await fetch(`https://api.aniapi.com/v1/anime?per_page=10${filter}`);
  const response = await fetch('https://api-football-standings.azharimm.site/leagues');
  const payload = await response.json();
  // const payload = await axios.get('/user?ID=12345');
  // const data = 'a b c d';
  // en código sincrono se puede poner await pero no tendría sentido
  // const dataArray = await data.split(' ');
  // console.log(dataArray);
  // API Football
  let list = payload.data;
  list = list.map(item => ({
    name: item.name,
    image: item.logos.light,
  }));
  // ANIME API
  // let list = [];
  // if (payload.data.documents) {
  //   list = payload.data.documents;
  // }
  // // let list = payload.data.documents ? payload.data.documents : [];
  // list = list.map(anime => {
  //   return {
  //     name: anime.titles.en,
  //     image: anime.cover_image,
  //   };
  // });
  return list;
};

const renderList = (animes) => {
  animes.forEach((menuItem) => {
    renderArticle(menuItem.name, menuItem.image);
  });
};

getAnimeListAPI() // es una promesa y las promesas tiene .then/.catch
  .then(renderList);

/* --- eventos --- */
const form = document.getElementById('search-form');
const searchInputGroup = document.querySelector('.input-container.search');

const setErrorClass = (inputElement, inputGroupElement) => {
  const spanError = inputGroupElement.querySelector('.error-message');
  if (inputElement.validity.valid) {
    inputGroupElement.classList.remove('error');
  } else {
    inputGroupElement.classList.add('error');
    spanError.textContent = inputElement.dataset.message;
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputValue = event.target.search.value;
  console.log(event.target.search.validity);
  setErrorClass(event.target.search, searchInputGroup);
  if (event.target.search.validity.valid) {
    mainListContent.innerHTML = 'Loading....';
    const animes = await getAnimeListAPI(inputValue);
    mainListContent.innerHTML = '';
    renderList(animes);
  }
  // if (!event.target.search.validity.valid) {
  //   searchInputGroup.classList.add('error');
  // } else {
  //   searchInputGroup.classList.remove('error');
  // }
});

const searchInput = document.getElementById('search');
console.log(searchInput.dataset);
searchInput.addEventListener('keyup', (event) => {
  // const inputValue = event.target.value;
  setErrorClass(event.target, searchInputGroup);
  // if (event.target.validity.valid) {
  //   searchInputGroup.classList.remove('error');
  // } else {
  //   searchInputGroup.classList.add('error');
  // }
});