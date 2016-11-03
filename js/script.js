var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=qIVpJvKKc4iSgQBaUIdGuiIEivEeyO0usGucaRc9";

$.ajax({
  url: url,
  success: function(results) {
    $("#count").html(results.element_count);
    //Below does the exact same thing, but more longer / ungainly
    //document.getElementById("count").innerHTML = results.element_count;

    var asteroids = results.near_earth_objects["2015-09-08"];
    var asteroid;
    var currentRow;
    for(var i = 0; i < asteroids.length; i ++) {

      if (i % 3 === 0){
        currentRow = $("<div></div>").addClass("row");
        $(".container").append(currentRow);
      }
      makeName(asteroids[i], currentRow);

    }
  }
});

  //Function creates a column containing the asteroid's name.
  function makeName(asteroid, row) {
    var column = $("<div></div").addClass("col-md-4");
    var name = $("<h3></h3>").html(asteroid.name);

    $(column).append(name);
    $(row).append(column);
  }
