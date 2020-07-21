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
      weather = json.weather;

      // 5 days weather condition
      /*
        mini_weather-X:
          *icon icon--rainy
          *icon icon--drizzle
          *icon icon--sun
          *icon icon--storm
          *icon icon--radioactive

        background weather:
          *rain
          *drizzle
          *sunny
          *storm
          *fallout
      */
      for(var i = 0; i < 5; i++) {
        // UTC to Date Converter
        var utcSeconds = weather.daily[i].dt;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds)
        d = d + '';
        d = d.split(" ");
        //console.log(d)
        document.getElementById('mini_day-' + i).innerHTML = d[1] + "/" + d[2];
        document.getElementsByClassName("slide__element slide__element--date")[i].innerHTML = d[0] + 
        ", " + d[2] + " of " + d[1] + " " + d[3];

        document.getElementsByClassName("slide__element slide__element--temp")[i].innerHTML = Math.round(weather.daily[i].temp.day) + 
        "°<small>C</small>"

        // MiniWeather + BackgroundWeather SET
        if(weather.daily[i].weather[0].main == "Rain"){
          //console.log(document.getElementById('mini_weather-' + i))
          document.getElementById('mini_weather-' + i).classList.remove('icon--sun');
          document.getElementById('mini_weather-' + i).classList.add('icon--rainy');
          //console.log(document.getElementById('slide-' + (i+1)).getAttribute("data-weather"));
          document.getElementById('slide-' + (i+1)).setAttribute("data-weather", "rain");
        }
        if(weather.daily[i].weather[0].description == "light rain" || weather.daily[i].weather[0].main == "Drizzle"){
          //console.log(document.getElementById('mini_weather-' + i))
          document.getElementById('mini_weather-' + i).classList.remove('icon--sun');
          document.getElementById('mini_weather-' + i).classList.remove('icon--rainy');
          document.getElementById('mini_weather-' + i).classList.add('icon--drizzle');
          document.getElementById('slide-' + (i+1)).setAttribute("data-weather", "drizzle");
        }
        if(weather.daily[i].weather[0].main == "Thunderstorm"){
          //console.log(document.getElementById('mini_weather-' + i))
          document.getElementById('mini_weather-' + i).classList.remove('icon--sun');
          document.getElementById('mini_weather-' + i).classList.add('icon--storm');
          document.getElementById('slide-' + (i+1)).setAttribute("data-weather", "storm");
        }
        if(weather.daily[i].weather[0].main == "Snow"){
          //console.log(document.getElementById('mini_weather-' + i))
          document.getElementById('mini_weather-' + i).classList.remove('icon--sun');
          document.getElementById('mini_weather-' + i).classList.add('icon--drizzle');
          document.getElementById('slide-' + (i+1)).setAttribute("data-weather", "drizzle");
        }
        if(weather.daily[i].weather[0].main == "Clear" || weather.daily[i].weather[0].main == "Clouds"){
          //console.log(document.getElementById('mini_weather-' + i))
          document.getElementById('mini_weather-' + i).classList.remove('icon--sun');
          document.getElementById('mini_weather-' + i).classList.add('icon--sun');
          document.getElementById('slide-' + (i+1)).setAttribute("data-weather", "sunny");
        }
      }

      //console.log(day_1.weather[0].main);

      //document.getElementById('country').textContent = weather.sys.country;
      //document.getElementById('temp').textContent = weather.main.temp;
      //document.getElementById('feels').textContent = weather.main.feels_like;
      //document.getElementById('max').textContent = weather.main.temp_max;
      //document.getElementById('min').textContent = weather.main.temp_min;
    } catch (error) {
      console.error(error);
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
    //console.log(db_json)
  });
} else {
  console.log('geolocation not available');
}
