// create a new map instance
const map = L.map('map').setView([58.3781, 26.7299], 12);

// add raster tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// create a new feature group
const featureGroup = L.featureGroup().addTo(map);

// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  L.choropleth(data, {
    valueProperty: 'TOWERS',
    scale: ['#ffffff', '#ff9900'],
    steps: 5,
    mode: 'q', // q for quantile, e for equidistant
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('District: ' + feature.properties.NIMI + '<br>' +
                      'Value: ' + feature.properties.TOWERS);
    },
  }).addTo(featureGroup);
}

// add Tartu city districts geoJSON data
addGeoJson('geojson/tartu_city_districts_edu.geojson');

// default map settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
 }