const navbar = document.querySelector('.nav');
/* 
items.forEach((item) => {console.log(item.innerHTML)});
for(const item of items) {console.log(item.innerHTML)};
*/

navbar.className = navbar.className.concat(" ", "nueva");
navbar.classList.add('newNavBar');
navbar.classList.remove('nueva');
//If exist it is erased, otherwise it is added
navbar.classList.toggle('nueva');

//setTimeout(()=>{alert("HOLA")},5000);
//setTimeout(()=>{alert("HOLA2")},2000);

//Render client side
const animesList = document.getElementById('anime-list')
series = ["Detective Conan", "Full metal", "kill la kill", "Shingeky no kiokin"]

//Method 1
const renderAnimeLi = (list, inputData) => {
    //pre: input data must be an array
    inputData.forEach((item) =>{
        const li = (document.createElement('li'));
        const a = document.createElement('a');
        a.href = "#"
        a.textContent = item;
        li.appendChild(a);
        list.appendChild(li);
    })
}
renderAnimeLi(animesList, series)
//setTimeout(()=>{addList(animesList, ["alain show"])},5000);


//Method 2
//series.forEach((item) => {animesList.appendChild('<li>' + item + '</li>')})


//Method 3
const template = document.querySelector('#article');
const mainListContent = document.getElementById('main-list-content');

const data = [
    {
      name: 'Attack on Titan Season 3 Part 2',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104578-LaZYFkmhinfB.jpg',
    },
    {
      name: 'Steins Gate',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx9253-7pdcVzQSkKxT.jpg',
    },
    {
      name: 'FLCL',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx227-kxQ3PDHrrqp5.jpg',
    },
    {
      name: 'The end of the evangelion',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx32-i4ijZI4MuPiV.jpg',
    },
    {
      name: 'K-ON!!',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx7791-kkyTqv0HI7D7.png',
    },
    {
      name: 'Demon Slayer: Kimetsu no Yaiba',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-PEn1CTc93blC.jpg',
    },
    {
      name: 'The Slayers Next',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx535-xCRCSK8YG89S.png',
    },
    {
      name: 'Death Note',
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-lawCwhzhi96X.jpg',
    },
]

const pintarRender = (article, anime) =>{
  const clone = template.content.cloneNode(true);
  (clone.querySelector('figcaption')).textContent = anime.name;
  (clone.querySelector('img')).src = anime.image;
  article.appendChild(clone)
}


const renderAnimes = (article, animes) => {
    animes.forEach((item) => {
        pintarRender(article,item)
    })
}

const getAnimeAPI = async (title) => {
  try{
    let filter = '';
    if(title){filter = `$title="${title}"`}
    const dominioAnime = `https://api.aniapi.com/v1/anime?per_page=10${title}`
    const response = await (await (fetch(dominioAnime))).json(); //GET
    let data = response.data.documents;
    data = data.map((anime) => {
      return{
        name: anime.titles.en,
        image: anime.cover_image
      }
      //pintarRender(mainListContent, newAnime)
    })
    return data;
  
  }catch(error){
    console.log(error)
  }
};

//renderAnimes(mainListContent, data)
/*
getAnimeAPI(title) //es promesa y tiene .then
  .then((animeList) => {
    renderAnimes(mainListContent,animeList);
  }
)
*/

//Evitar recarga de la pagina y llevar al anime
const form = document.getElementById('search-form')
const search = document.querySelector('.input-container.search');
const searchInput = document.getElementById('search')
const addErrorClass = (input,valid) => {
  if(!valid){ input.classList.add('error')}
  else{
    input.classList.remove('error')
    const newSpan = (input.querySelector('.error-message'))
    newSpan.textContent = "sadsadad"
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = event.target.search.value;  
  addErrorClass(search,event.target.search.validity.valid)
  if(event.target.search.validity.valid){
    const animes = getAnimeAPI(inputValue)
    renderAnimes(mainListContent,animes)
  }
})

//quitar el mensaje rojo cuando se escriba

searchInput.addEventListener('keyup', (event) => {
  addErrorClass(search,event.target.validity.valid)
})