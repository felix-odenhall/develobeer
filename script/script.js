// Creates the beer cards for the shuffle page. 
// We put them in the shuffle container, and give them a html structure.
// We are using the properties we create in "formatPost".

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

// Creates the porperties that we use in functions "createPreviewBeer" and "createGrid".
// I have tried to not include this and it works, but it's easier to read the code with these properties.

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

// Creates the beer cards for the beer page. 
// We need the function "createGrid" because these cards will look different and have a white background,
//    compared to the ones on the shuffle page, where we use "createPreviewBeer".

// We put them in the beer container, and give them a html structure.
// We are using a for loop to pick all the objects in the array. This for loop works differently, since we want all blog post now
// We are using the properties we create in formatPost


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

// In the function "getPosts" is where we fetch the blog posts created in wordpress and converts them to json and then we create an
//      array from the json file
// "getPosts" is called in the body element on the pages: "shuffle.html" and "beers.html" which runs this function as we enter the pages.

function getPosts() { 
  fetch("http://localhost:8888/wp-json/wp/v2/posts?_embed&per_page=100")
    .then((response) => response.json()) 
    .then((data) => { 
      // create formatedPosts which is an empty array, then we loop through all the data pulled from the json file.
      // the push method is used to insert all of the json data into the array.
      let formatedPosts = [];
      for (let i = 0; i < data.length; i++) { 
        formatedPosts.push(formatPost(data[i])) 

      }
      // Here we call the function "createGrid" and passing the array "formatedPosts" to the function.
      createGrid(formatedPosts) 

      // this is where we ge tthe random number. we use -1 to adjust for 0 in the array. Otherwise we would never get the first object
      //     and sometimes look for more than the last number, which do not exists.
      let randomNumber = getRandomNumber(data.length - 1);
      // We call the function "createPreviewBeer" and then passing it the array with a random index.
      createPreviewBeer(formatedPosts[randomNumber])

      if (!document.getElementById("shuffle-btn")) return null
      // When clicking the "shuffle-btn" we generate a random number and the run "createPreviewBeer" again.
      const shuffleBtn = document.getElementById('shuffle-btn');
      shuffleBtn.addEventListener('click', () => {
        randomNumber = getRandomNumber(data.length - 1);
        createPreviewBeer(formatedPosts[randomNumber])
      });
    });
}

// This is what makes the randomness of shuffle work
// It goes through the array in the json file and picks a random object. 
// Math.random pick a number between 0 and 1.
// Math.floor rounds DOWN to the nearest integer

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
  
}

// ------ NAVBAR ------ //


// Here we create a variable: navSlide, which we will call later.
// When we click the hamburger menu, we add or remove the classes "nav-active" and "toggle"
// adding or removing "nav-active" is triggering the "nav-active" class in CSS which makes the navbar slide.
// adding or removing "toggle" is triggering the class "toggle" class in CSS, which creates the animations when clicking the hamburger icon.
const navSlide = () => {
  const burger = document.querySelector('.navbar__hamburger');
  const nav = document.querySelector('.navbar__list');


  burger.addEventListener('click',()=>{
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');

  });

}

// this is where we call the navSlide function.
navSlide();