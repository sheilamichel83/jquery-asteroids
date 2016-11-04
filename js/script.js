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

        currentRow = $("<div></div>").addClass("row");
        $(".container").append(currentRow);

      makeName(asteroids[i], currentRow);
      makeSize(asteroids[i], currentRow);
      makeClose(asteroids[i], currentRow);

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

function makeSize(asteroid, row){
  var column = $("<div></div>").addClass("col-md-4");
  //TODO:I should calculate the average size of the asteroid, rather thatn just
  //use it's mas diameter.
  var size = $("<h4></h4>").html(asteroid.estimated_diameter.feet.estimated_diameter_max);

$(column).append(size);
$(row).append(column);
}

//This function is used to create the third column, which contains close
//approach data about this asteroid.
function makeClose(asteroid, row){
  var column = $("<div></div>").addClass("col-md-4");
  var speed = $("<h4></h4>").html(asteroid.close_approach_data[0].relative_velocity.miles_per_hour);
  var distance = $("<h4></h4>").html(asteroid.close_approach_data[0]);

  var hazard = $("<h4></h4>");
  if (asteroid.is_potentially_harzardous_asteroid) {
      $(hazard).html("Dangerous").addClass("text-danger");
  }else {
    $(hazard).html("Safe").addClass("text-success");
  }

  $(column).append(speed);
  $(column).append(distance);
  $(column).append(hazard);
  $(row).append(column);
}
