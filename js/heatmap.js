addGeoJson('geojson/tartu_city_celltowers_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 console.log(data.features[0])
}
