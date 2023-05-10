// Function to convert feature data for Leaflet heat
function heatDataConvert(feature) {
    return [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      feature.properties.area
    ];
  }
  
  // Create a Leaflet map with default settings
  function defaultMapSettings() {
    const map = L.map('map').setView([58.38, 26.72], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);
    return map;
  }
  
  // Initialize the Leaflet map
  const map = defaultMapSettings();
  
  // Add GeoJSON layer with heatmap
  addGeoJson('geojson/tartu_city_celltowers_edu.geojson');
  
  // Function to fetch and add GeoJSON layer
  async function addGeoJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    const heatData = data.features.map(heatDataConvert);
    const heatMap = L.heatLayer(heatData, { radius: 10 });
    heatMap.addTo(map);
  }
  