function createPreviewBeer(beer) {
  if (!document.getElementById('shuffle__container')) return null;
  let wrapper = document.getElementById('shuffle__container');
  wrapper.innerHTML = ` 
    <img src="${beer.img}" alt="A image of the randomized beer" />
      <div class="card-wrapper__content">
       <h2>
       ${beer.brewery}<br>${beer.beer}
       </h2>
      </div>
      </a>`;
}

function createGrid(data) {
  if (!document.querySelector('.container-beer')) return null;
  for (let i = 0; i < data.length; i++) {
    let wrapper = document.querySelector('.container-beer');
    wrapper.innerHTML += ` 
    <div class="container-beer__card">
    <img src="${data[i].img}" alt="A random image of a beer" />
      <div class="card-wrapper__content">
       <h2>
       ${data[i].brewery}<br>${data[i].beer}
       </h2>
      </div>
      </a>
      </div>`;
  }
}

function getPosts() {
  fetch('../data/data.json')
    .then((data) => data.json())
    .then((data) => {
      console.log(data);

      createGrid(data);

      let randomNumber = getRandomNumber(data.length - 1);

      createPreviewBeer(data[randomNumber]);

      if (!document.getElementById('shuffle-btn')) return null;

      const shuffleBtn = document.getElementById('shuffle-btn');
      shuffleBtn.addEventListener('click', () => {
        randomNumber = getRandomNumber(data.length - 1);
        createPreviewBeer(data[randomNumber]);
      });
    });
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

const navSlide = () => {
  const burger = document.querySelector('.navbar__hamburger');
  const nav = document.querySelector('.navbar__list');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
};

navSlide();
