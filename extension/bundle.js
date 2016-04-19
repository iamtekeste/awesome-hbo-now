"use strict";

var getMediaBoxes = function getMediaBoxes() {
  return $(".now-thumbnail");
};

var getMediaBoxObj = function getMediaBoxObj(mediaBoxes) {
  var titles = [];
  mediaBoxes.each(function (i, el) {
    var obj = {
      index: i,
      title: $(el).find(".now-thumbnail-bottomtext").text().trim()
    };
    titles.push(obj);
  });
  return titles;
};
//get the movie/series boxes
var mediaBoxes = getMediaBoxes();
//foreach movie box get the title
var mediaBoxObjs = getMediaBoxObj(mediaBoxes);
function fetchIMDBData(movieObjs, cb) {
  var length = movieObjs.length;
  var movies_data = new Object();
  var count = 0;
  movieObjs.forEach(function (movie) {

    var url = "http://www.omdbapi.com/?plot=short&r=json&t=" + encodeURIComponent(movie.title);
    $.ajax({
      url: url,
      type: "GET",
      success: function success(data) {
        data.index = count;
        func(data);
        // data.index = count;
        // movies_data[count] = data;
        count++;
        // if (count === length) {
        //   cb(movies_data);
        // }
      }
    });
  });
};
function func(data) {
  console.log(data);
}
$(document).ready(function () {
  //get the movie/series boxes
  var mediaBoxes = getMediaBoxes();
  //foreach movie box get the title
  var mediaBoxObjs = getMediaBoxObj(mediaBoxes);
  fetchIMDBData(mediaBoxObjs, function (moviesData) {
    //updateDom(mediaBoxes, moviesData);
  });
});

function updateDom(mediaBoxes, moviesData) {}
// console.log(moviesData[0]);


//create the ahn-info node
//append ahn-info to now-thumbnail-overlay
