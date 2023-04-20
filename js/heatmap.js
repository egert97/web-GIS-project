addGeoJson('geojson/tartu_city_celltowers_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const heatData = data.features.map(heatDataConvert)
 console.log(heatData)
}
function heatDataConvert(feature) {
 return [
 feature.geometry.coordinates[1],
 feature.geometry.coordinates[0],
 feature.properties.area,
 ]
}
