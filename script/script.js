function createPreviewBeer(beer) {  
  if (!document.getElementById("shuffle__container")) return null
  let wrapper = document.getElementById("shuffle__container")
    wrapper.innerHTML = ` 
    <a href="${beer.link}" target="_blank">  
    <img src="${beer.previewImage}" alt="A random image of a beer" />
      <div class="card-wrapper__content">
       <h2>
       ${beer.brewery}<br>${beer.nameOfBeer}
       </h2>
      </div>
      </a>`;
};

function formatPost(post) { 
  let formated = {
    id: post.id, 
    brewery: post.title.rendered, 
    previewImage: post._embedded["wp:featuredmedia"][0].source_url,
    nameOfBeer: post.excerpt.rendered,
    link: 'https://www.systembolaget.se/produkt/ol/'+post.slug,
  };
  return formated;
}

function createGrid(data) {

  if (!document.querySelector(".container-beer")) return null
  for (let i = 0; i < data.length; i++) {
    let wrapper = document.querySelector(".container-beer") 
    wrapper.innerHTML += ` 
    <div class="container-beer__card">
    <a href="${data[i].link}" target="_blank">  
    <img src="${data[i].previewImage}" alt="A random image of a beer" />
      <div class="card-wrapper__content">
       <h2>
       ${data[i].brewery}<br>${data[i].nameOfBeer}
       </h2>
      </div>
      </a>
      </div>`;
  }
}


function getPosts() { 
  fetch("http://localhost:8888/wp-json/wp/v2/posts?_embed&per_page=100")
    .then((response) => response.json()) 
    .then((data) => { 
      let formatedPosts = [];
      for (let i = 0; i < data.length; i++) { 
        formatedPosts.push(formatPost(data[i])) 

      }
      console.log('hello');
      createGrid(formatedPosts) 

      let randomNumber = getRandomNumber(data.length - 1);
      createPreviewBeer(formatedPosts[randomNumber])

      if (!document.getElementById("shuffle-btn")) return null
      const shuffleBtn = document.getElementById('shuffle-btn');
      shuffleBtn.addEventListener('click', () => {
        randomNumber = getRandomNumber(data.length - 1);
        createPreviewBeer(formatedPosts[randomNumber])
      });
    });
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}


// ------ NAVBAR ------

const navSlide = () => {
  const burger = document.querySelector('.navbar__hamburger');
  const nav = document.querySelector('.navbar__list');
  const navLinks = document.querySelectorAll('.navbar__list li');


  burger.addEventListener('click',()=>{
          //Toggle nav
      nav.classList.toggle('nav-active');
      //     // Toggle means: turn on and off, like a light switch
      // //Animate links
      // navLinks.forEach((link, index)=>{
      //     if (link.style.animation) {
      //         link.style.animation = ''
      //     } else {
      //         link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      //     }
      // });
      // //Burger animation
      burger.classList.toggle('toggle');

  });

}

navSlide();