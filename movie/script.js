// api : http://www.omdbapi.com/?i=tt3896198&apikey=97b96b4d

const searchBox = document.getElementById('movie-search-box');
const resultGrid = document.getElementById('result-grid');
const searchList = document.getElementById('search-list');

async function loadMovies(searchInput) {
  const URI = `https://www.omdbapi.com/?s=${searchInput}&page=1&apikey=97b96b4d`;
  const res = await fetch(`${URI}`);
  const data = await res.json();
  //   console.log(data);
  if (data.Response == 'True') displayMovies(data.Search);
}

async function findMovies() {
  let URI = searchBox.value.trim();
  if (URI.length === 0) {
    searchList.classList.add('hide-search-list');
  } else {
    searchList.classList.remove('hide-search-list');
    loadMovies(URI);
  }
}

function displayMovies(datas) {
  searchList.innerHTML = ``;
  for (let i = 0; i < datas.length; i++) {
    let movieListItems = document.createElement('div');
    movieListItems.dataset.id = datas[i].imdbID;
    movieListItems.classList.add('search-list-item');
    if (datas[i].Poster != 'N/A') {
      moviePoster = datas[i].Poster;
    } else moviePoster = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand-thumbnail.png';
    movieListItems.innerHTML = `<div class="search-list-item">
    <div class="search-item-thumbnail">
      <img src="${moviePoster}" alt="" srcset="" />
    </div>
    <div class="search-item-info">
      <h3>${datas[i].Title}</h3>
      <p>${datas[i].Year}</p>
    </div>
  </div> `;
    searchList.appendChild(movieListItems);
  }
  console.log(searchList);
  searchList.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Tombol enter ditekan
      console.log('Tombol enter ditekan!');
      // Eksekusi tindakan yang diinginkan
    }
    console.log('a');
  });
  getResultMovies();
}

function getResultMovies() {
  const resultmovies = document.querySelectorAll('.search-list-item');
  //   console.log(resultmovies);
  resultmovies.forEach((element) => {
    element.addEventListener('click', async () => {
      searchList.classList.add('hide-search-list');
      searchBox.value = '';
      if (element.dataset.id) {
        const result = await fetch(`https://www.omdbapi.com/?i=${element.dataset.id}&apikey=97b96b4d`);
        const data = await result.json();
        displayResultMovies(data);
        console.log(data);
        // console.log(result);
      }
    });
  });
}

function displayResultMovies(data) {
  if (data.Poster == 'N/A') {
    data.Poster = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand-thumbnail.png';
  }
  resultGrid.innerHTML = `<div class="movie-poster">
      <img src="${data.Poster}" alt="" srcset="" />
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${data.Title}</h3>
      <ul class="movie-misc-info">
        <li class="year">Tahun: ${data.Year}</li>
        <li class="rated">Peringkat: ${data.Rated}</li>
        <li class="released">Rilis: ${data.Released}</li>
      </ul>
      <p class="genre"><b>Genre:</b> ${data.Genre}</p>
      <p class="writer"><b>Penulis:</b> ${data.Writer}</p>
      <p class="actors"><b>Aktor:</b> ${data.Actors}</p>
      <p class="plot">
        <b>Plot:</b>
        ${data.Plot}
      </p>

      <p class="language"><b>Bahasa:</b> ${data.Language}</p>
      <p class="awards">
        <b><i class="fas fa-award"></i> ${data.Awards}</b>
      </p>
    </div>`;
}
