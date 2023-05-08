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
