// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
      weather = json.weather;
      document.getElementById('country').textContent = weather.sys.country;
      document.getElementById('temp').textContent = weather.main.temp;
      document.getElementById('feels').textContent = weather.main.feels_like;
      document.getElementById('max').textContent = weather.main.temp_max;
      document.getElementById('min').textContent = weather.main.temp_min;
      var sunset = weather.sys.sunset
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(sunset);
      d = d.toString()
      sunset = d.split(" ")
      document.getElementById('sunset').textContent = sunset[4];
    } catch (error) {
      console.error(error);
      air = { value: -1 };
      document.getElementById('aq_value').textContent = 'NO READING';
    }

    const data = { lat, lon, weather, air };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
  });
} else {
  console.log('geolocation not available');
}
