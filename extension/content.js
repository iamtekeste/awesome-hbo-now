var getMediaBoxes = function () {
	return $(".now-thumbnail");
};

var getMediaBoxObj =  mediaBoxes => {
	var titles = [];
	mediaBoxes.each((i) =>{
		var obj = {
			index: i,
			title : $(this).find(".now-thumbnail-bottomtext").text().trim(),
		}
		titles.push(obj);
	});
	return titles
}
//get the movie/series boxes
var mediaBoxes = getMediaBoxes();
//foreach movie box get the title
var mediaBoxObjs = getMediaBoxObj(mediaBoxes);
function fetchIMDBData(movieObjs, cb){
  var length = movieObjs.length;
  var movies_data = new Object();
  var count = 0;
  movieObjs.forEach(function(movie){
    $.ajax({
      url: "http://www.omdbapi.com/?plot=short&r=json&t=" + encodeURIComponent(movie.title),
      type: "GET",
      success: function(data) {
        movies_data[count] = data;
        count++;
        if (count === length) {
          cb(movies_data);
        }
      }
    });
  });
};

$(document).ready(function(){
	//get the movie/series boxes
var mediaBoxes = getMediaBoxes();
//foreach movie box get the title
var mediaBoxObjs = getMediaBoxObj(mediaBoxes);
  var movies = fetchIMDBData(mediaBoxObjs, function(moviesData) {
    console.log(moviesData)
  });
});

//create the ahn-info node
//append ahn-info to now-thumbnail-overlay
