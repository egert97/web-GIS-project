var map = L.map('map').setView([58.3781, 26.7295], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

var cellTowers = L.geoJSON(tartu_city_celltowers_edu, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  }
}).addTo(map);

function convertToHeatmapData(data) {
  var heatmapData = [];
  data.forEach(function(feature) {
    var lat = feature.geometry.coordinates[1];
    var lon = feature.geometry.coordinates[0];
    var value = feature.properties.height;
    heatmapData.push([lat, lon, value]);
  });
  return heatmapData;
}

var heatmapData = convertToHeatmapData(cellTowers.toGeoJSON().features);

var heatmap = L.heatLayer(heatmapData, {radius: 10}).addTo(map);

function defaultMapSettings() {
  map.setView([58.3781, 26.7295], 13);
}