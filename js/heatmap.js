// Create a new map instance
const map = L.map('map').setView([58.3781, 26.7299], 12);

// Add raster tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Function to convert feature data for Leaflet heat
function heatDataConvert(feature) {
  return [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.area
  ];
}

// Default map settings
function defaultMapSettings() {
  map.setView([58.3781, 26.7299], 12);
}

// Call defaultMapSettings() to set up the map
defaultMapSettings();

// Function to fetch and add GeoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  const heatData = data.features.map(heatDataConvert);
  const heatMap = L.heatLayer(heatData, { radius: 10 });
  heatMap.addTo(map);
}

// Add GeoJSON layer with heatmap
addGeoJson('geojson/tartu_city_celltowers_edu.geojson');
