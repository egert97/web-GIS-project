// create a new feature group
const featureGroup = L.featureGroup().addTo(map);

// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  const choroplethLayer = L.choropleth(data, {
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
      layer.bindPopup('Value: ' + feature.properties.OBJECTID);
    },
  });
  featureGroup.addLayer(choroplethLayer);
}
addGeoJson('geojson/tartu_city_districts_edu.geojson');
