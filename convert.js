$(document).ready(function() {
  $('#convert').click(function() {
    const gMapsList = $('#input').val();
    console.log(gMapsList);
    const gMapsPlaces = gMapsList.split("\n\n");
    console.log(gMapsPlaces);

    var points = [];
    _.each(gMapsPlaces, function(place) {
      var coordsRegex = /\(([^)]+)\)/;
      var matches = coordsRegex.exec(place);
      if (!matches) {
        return;
      }
      var latLong = matches[1].split(",")
      var lat = latLong[0].trim();
      var long = latLong[1].trim();

      var i = place.indexOf(")\n")
      var name = place.substring(i+2);

      const point = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [parseFloat(long), parseFloat(lat)]
        },
        "properties": {
          "name": name
        }
      }
      points.push(point);
    });

    console.log(points);

    var geoJson = {
      "type": "FeatureCollection",
      "features": points
    }

    console.log(geoJson);
    $('#output').val(JSON.stringify(geoJson));
  });
});
