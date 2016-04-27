"use strict";

var nowThumbnails = void 0;
var nowThumbnailsOverlays = [];
var titles = [];
window.onload = function () {
  nowThumbnails = document.querySelectorAll('.now-thumbnail'); //$('.')
  getTitles(nowThumbnails);
  for (var i = 0; i < titles.length; i++) {
    makeApiRequest(i, titles[i]);
  }
};

var getTitles = function getTitles(nowThumbnails) {
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
};

var makeApiRequest = function makeApiRequest(index, title) {
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
};

var updateDOM = function updateDOM(response, index) {
  //get category i.e is it movie or series
  var category = getCategory(index);
  if (response.Plot != undefined && response.Plot.length > 5 && category === response.Type) {
    //create the ahn-info node
    var ahnInfoNode = createAHNInfo(response);
    //get the nowThumbnail at index index
    nowThumbnailsOverlays[index].appendChild(ahnInfoNode);
  }
};

var getCategory = function getCategory(index) {
  var parent = nowThumbnailsOverlays[index].parentNode;
  var category = parent.dataset.category.toLowerCase();
  if (category === "movies") category = "movie";
  return category;
};

var createAHNInfo = function createAHNInfo(response) {
  var ahnInfoHTML = " <div class=\"ahn-info\" data-year=\"" + response.Year + "\"> \n    <p class=\"plot\">\n      " + response.Plot + "\n    </p>\n    <span class=\"ahn-imdb-rating\"> \n      <span>Rating: </span>\n      " + response.imdbRating + "\n  </div> ";
  var ahnInfoNode = document.createElement('div');
  ahnInfoNode.innerHTML = ahnInfoHTML;
  return ahnInfoNode;
};

var getPage = function getPage() {
  var page = location.pathname.replace("/", "");
  if (page === "series") return "series";
  if (page === "movies") return "movie";
};
var log = function log(x) {
  console.log(x);
};
