"use strict";

var nowThumbnails;
var nowThumbnailsOverlays = [];
var titles = [];
window.onload = function () {
  nowThumbnails = document.querySelectorAll('.now-thumbnail'); //$('.')
  getTitles(nowThumbnails);
  for (var i = 0; i < titles.length; i++) {
    makeApiRequest(i, titles[i]);
  }
};

function getTitles(nowThumbnails) {
  [].forEach.call(nowThumbnails, function (el) {
    var nowThumbnailChildren = el.childNodes;
    [].forEach.call(nowThumbnailChildren, function (el) {
      if (el.classList != undefined) {
        if (el.classList.contains("now-thumbnail-bottomtext")) {
          titles.push(el.childNodes[1].innerHTML);
        }
        if (el.classList.contains("now-thumbnail-overlay")) {
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
  xhr.onload = function () {
    if (xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.response);
      updateDOM(jsonResponse, index);
    }
  };
}

function updateDOM(response, index) {
  if (response.Plot != undefined && response.Plot.length > 5 && getPage() === response.Type) {
    //create the ahn-info node
    var ahnInfoNode = createAHNInfo(response);
    //get the nowThumbnail at index index
    nowThumbnailsOverlays[index].appendChild(ahnInfoNode);
  }
}

function createAHNInfo(response) {
  var ahnInfoHTML = " <div class=\"ahn-info\" data-year=\"" + response.Year + "\"> \n    <p class=\"plot\">\n      " + response.Plot + "\n    </p>\n    <span class=\"ahn-imdb-rating\"> \n      <span>Rating: </span>\n      " + response.imdbRating + "\n  </div> ";
  var ahnInfoNode = document.createElement('div');
  ahnInfoNode.innerHTML = ahnInfoHTML;
  return ahnInfoNode;
}

function getPage() {
  var page = location.pathname.replace("/", "");
  if (page === "series") return "series";
  if (page === "movies") return "movie";
}
function log(x) {
  console.log(x);
}
