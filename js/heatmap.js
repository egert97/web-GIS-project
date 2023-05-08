// create map
var map = L.map('map').setView([58.38, 26.72], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
 maxZoom: 18,
}).addTo(map);

// add geoJSON layer
addGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// add geoJSON layer
async function addGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const heatData = data.features.map(heatDataConvert)
 const heatMap = L.heatLayer(heatData, { radius: 10 })
 heatMap.addTo(map)
}

// prepare spatial data for Leaflet heat
function heatDataConvert(feature) {
 const lat = feature.geometry.coordinates[1];
 const lon = feature.geometry.coordinates[0];
 const value = feature.properties.cell_tower_count;
 return [lat, lon, value];
}
