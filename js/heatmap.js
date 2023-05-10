// addGeoJson function to fetch and add GeoJSON layer
async function addGeoJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    const heatData = data.features.map(heatDataConvert);
    const heatMap = L.heatLayer(heatData, { radius: 10 });
    heatMap.addTo(map);
  }
  
  // Function to convert feature data for Leaflet heat
  function heatDataConvert(feature) {
    return [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      feature.properties.area
    ];
  }
  
  // Initialize the Leaflet map
  const map = L.map('map').setView([0, 0], 2);
  
  // Call addGeoJson function with the desired GeoJSON file
  addGeoJson('geojson/tartu_city_celltowers_edu.geojson');
  