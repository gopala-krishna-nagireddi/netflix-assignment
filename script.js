const favoriteList = [];

document.addEventListener("DOMContentLoaded", function () {
  const searchEl = document.querySelector(".search-input");
  const movieDetailsContainerEl = document.querySelector(
    ".movie-details-container"
  );

  const splidesListEl = document.querySelector("#recommendMovies");
  const favList = document.querySelector("#favoriteMovies");

  function renderFavoriteList() {
    const favList = JSON.parse(localStorage.getItem("fav-list"));

    if (favList !== undefined) {
      for (let movieDetails of favList) {
        let splideItemEl = document.createElement("li");
        splideItemEl.classList.add("splide__slide");
        favList.appendChild(splideItemEl);

        let splideImgContainerEl = document.createElement("div");
        splideImgContainerEl.classList.add("splide-img-container-el");
        splideItemEl.appendChild(splideImgContainerEl);

        let splideImgEl = document.createElement("img");
        splideImgEl.src = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
        splideImgEl.classList.add("splide-movie-poster");
        splideImgContainerEl.appendChild(splideImgEl);

        let splideFavIcon = document.createElement("img");
        splideFavIcon.src = "/images/Favorite.png";
        splideFavIcon.classList.add("fav-icon");
        splideFavIcon.addEventListener("click", function () {
          favoriteList.push(movieDetails);
          localStorage.setItem("fav-list", JSON.stringify(favoriteList));
          renderFavoriteList();
        });
        splideImgContainerEl.appendChild(splideFavIcon);

        let splideHeadingEl = document.createElement("h3");
        splideHeadingEl.textContent = movieDetails.title;
        splideHeadingEl.classList.add("splide-heading");
        splideItemEl.appendChild(splideHeadingEl);

        let movieGenereEl = document.createElement("p");
        movieGenereEl.textContent = movieDetails.release_date;
        splideItemEl.appendChild(movieGenereEl);
      }
    }
  }

  var splide = new Splide("#fav", {
    perPage: 4,
    perMove: 4,
    focus: "center",
    pagination: false,
    gap: 50,
    omitEnd: true,
    breakpoints: {
      768: {
        perPage: 2,
        perMove: 2,
        gap: 10,
      },
    },
  });

  splide.mount();

  function createAndAppendMovie(movieDetails, firstResult) {
    if (firstResult === 1) {
      movieDetailsContainerEl.innerHTML = `
    <div class="movie-poster-container">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}" alt="${movieDetails.title}" />
    </div>
    <div class="movie-title-description-container">
        <h2 class="movie-title">${movieDetails.title}</h2>
        <p class="category">Category</p>
        <p class="release-date">Release Date: ${movieDetails.release_date}</p>
        <p class="movie-description">${movieDetails.overview}</p>
    </div>
    `;
    } else {
      let splideItemEl = document.createElement("li");
      splideItemEl.classList.add("splide__slide");
      splidesListEl.appendChild(splideItemEl);

      let splideImgContainerEl = document.createElement("div");
      splideImgContainerEl.classList.add("splide-img-container-el");
      splideItemEl.appendChild(splideImgContainerEl);

      let splideImgEl = document.createElement("img");
      splideImgEl.src = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
      splideImgEl.classList.add("splide-movie-poster");
      splideImgContainerEl.appendChild(splideImgEl);

      let splideFavIcon = document.createElement("img");
      splideFavIcon.src = "/images/Favorite.png";
      splideFavIcon.classList.add("fav-icon");
      splideFavIcon.addEventListener("click", function () {
        favoriteList.push(movieDetails);
        localStorage.setItem("fav-list", JSON.stringify(favoriteList));
        renderFavoriteList();
      });
      splideImgContainerEl.appendChild(splideFavIcon);

      let splideHeadingEl = document.createElement("h3");
      splideHeadingEl.textContent = movieDetails.title;
      splideHeadingEl.classList.add("splide-heading");
      splideItemEl.appendChild(splideHeadingEl);

      let movieGenereEl = document.createElement("p");
      movieGenereEl.textContent = movieDetails.release_date;
      splideItemEl.appendChild(movieGenereEl);
    }
  }

  function renderSearchResults(searchResults) {
    let index = 1;
    console.log(searchResults.results);
    if (searchResults.results !== undefined) {
      for (let eachMovie of searchResults.results) {
        createAndAppendMovie(eachMovie, index);
        index += 1;
      }
    }

    var splide = new Splide("#recommend", {
      perPage: 4,
      perMove: 4,
      focus: "center",
      pagination: false,
      gap: 50,
      omitEnd: true,
      breakpoints: {
        768: {
          perPage: 2,
          perMove: 2,
          gap: 10,
        },
      },
    });

    splide.mount();
  }

  function fetchMovieDetails(searchValue) {
    const apiKey = "18e47822630f2a53c3f1a30a5b2dc698";
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (searchResults) {
        renderSearchResults(searchResults);
      });
  }

  searchEl.addEventListener("input", function (e) {
    fetchMovieDetails(e.target.value);
  });

  renderFavoriteList();
});

script.js;
