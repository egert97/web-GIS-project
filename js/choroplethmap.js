// create a new feature group
const featureGroup = L.featureGroup().addTo(map);

// add geoJSON layer
async function addGeoJson(url, map) {
 const response = await fetch(url)
 const data = await response.json()
 L.choropleth(data, {
   valueProperty: 'OBJECTID',
   scale: ['#ffffff', '#ff9900'],
   steps: 5,
   mode: 'q', // q for quantile, e for equidistant
   style: {
     color: '#fff',
     weight: 2,
     fillOpacity: 0.8,
   },
   onEachFeature: function (feature, layer) {
     layer.bindPopup('Value: ' + feature.properties.OBJECTID)
   },
 }).addTo(featureGroup)
}

addGeoJson('geojson/tartu_city_districts_edu.geojson', map);
