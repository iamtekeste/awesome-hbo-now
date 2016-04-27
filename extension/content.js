"use strict";
let nowThumbnails;
let nowThumbnailsOverlays = [];
let titles = [];
window.onload  = () => {
  nowThumbnails = document.querySelectorAll('.now-thumbnail'); //$('.')
  getTitles(nowThumbnails);
  for(let i = 0; i < titles.length; i++) {
    makeApiRequest(i, titles[i]);
  }
};

let getTitles =  (nowThumbnails) => {
  [].forEach.call(nowThumbnails, (el) => {
    let nowThumbnailChildren = el.childNodes;
    [].forEach.call(nowThumbnailChildren , (el) => {
      if(el.classList != undefined) {
        if(el.classList.contains("now-thumbnail-bottomtext")) {
          titles.push( el.childNodes[1].innerHTML );
        }
        if(el.classList.contains("now-thumbnail-overlay")) {
          nowThumbnailsOverlays.push(el);
        }
      }
    });
  });
}

let makeApiRequest = (index, title) => {
  let xhr = new XMLHttpRequest(); 
  let encodedTitle = encodeURIComponent(title);
  xhr.open('GET', 'https://www.omdbapi.com/?plot=short&r=json&t=' + title);
  xhr.send();
  xhr.onload = () => {
    if(xhr.status === 200) {
      let jsonResponse = JSON.parse(xhr.response)
      updateDOM(jsonResponse, index)
    }
  }
}

let  updateDOM = (response, index) => {
  //get category i.e is it movie or series
  let category = getCategory(index);
  if(response.Plot != undefined && response.Plot.length > 5 && category === response.Type) {
    //create the ahn-info node
    let ahnInfoNode = createAHNInfo(response);
    //get the nowThumbnail at index index
    nowThumbnailsOverlays[index].appendChild(ahnInfoNode)
  }
}

let getCategory = (index) => {
  let parent = nowThumbnailsOverlays[index].parentNode;
  let category= parent.dataset.category.toLowerCase();
  if (category === "movies")
        category = "movie";
  return category; 
}

let createAHNInfo = (response) => {
 let ahnInfoHTML = ` <div class="ahn-info" data-year="${response.Year}"> 
    <p class="plot">
      ${response.Plot}
    </p>
    <span class="ahn-imdb-rating"> 
      <span>Rating: </span>
      ${response.imdbRating}
  </div> `;
  let ahnInfoNode = document.createElement('div');
  ahnInfoNode.innerHTML = ahnInfoHTML;
  return ahnInfoNode;
}

let getPage = () => {
  let page = location.pathname.replace("/", "");
  if(page === "series")
      return "series";
  if (page === "movies")
      return "movie"; 
} 
let log = (x) => {
  console.log(x);
}