"use strict";
var nowThumbnails;
var nowThumbnailsOverlays = [];
var titles = [];
window.onload  = () => {
  nowThumbnails = document.querySelectorAll('.now-thumbnail');
  getTitles(nowThumbnails);
  for(var i = 0; i < titles.length; i++) {
    makeApiRequest(i, titles[i]);
  }
};

function getTitles (nowThumbnails) {
  [].forEach.call(nowThumbnails, (el) => {
    var nowThumbnailChildren = el.childNodes;
    [].forEach.call(nowThumbnailChildren , (el) => {
      if(el.classList != undefined) {
        if(el.classList.contains("now-thumbnail-bottomtext")) {
          titles.push( el.childNodes[1].innerHTML );
        }
        if(el.classList.contains("now-thumbnail-overlay")) {
          log(el)
          nowThumbnailsOverlays.push(el);
        }
      }
    });
  });
}

function makeApiRequest(index, title) {
  var xhr = new XMLHttpRequest();
  var encodedTitle = encodeURIComponent(title);
  xhr.open('GET', 'https://www.omdbapi.com/?plot=short&r=json&t=' + title);
  xhr.send();
  xhr.onload = () => {
    if(xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.response)
      updateDOM(jsonResponse, index)
    }
  }
}

function updateDOM(response, index) {
  if(response.Plot != undefined) {
    //create the ahn-info node
    var ahnInfoNode = createAHNInfo(response);
    //get the nowThumbnail at index index
    nowThumbnailsOverlays[index].appendChild(ahnInfoNode)
  }
}

function createAHNInfo(response) {
 var ahnInfoHTML = ` <div class="ahn-info">
    <p class="plot">
      ${response.Plot}
    </p>
    <span class="ahn-imdb-rating"> 
      <span>Rating: </span>
      ${response.imdbRating}
  </div> `;
  var ahnInfoNode = document.createElement('div');
  ahnInfoNode.innerHTML = ahnInfoHTML;
  return ahnInfoNode;
}