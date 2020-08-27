# Lazy-Weather

Lazy Weather is a simple website that gets your current location and uses it in open weather API to check the
weather in your area, it uses WebGL to make realistic rain.

You can learn more about WebGL [here](https://webglfundamentals.org/).

Raindrops are made by using alpha channels and its color is a result of normal mapping, thats how the distorted
effect from the background is achieved. Also the background is Fouced using the same engine.

## Live Example
An [OpenWeather Live Example](http://lazy-weather.herokuapp.com/) can be found on the root of the project this
helped me experiment with the open weather api, in order to test the various calls that are available in the API.

![Experiment](https://media.giphy.com/media/hr9WlXNTM3OjakfaKg/giphy.gif)

A [Lazy Weather Live Example](http://lazy-weather.herokuapp.com/app) can be found on /app subdomain of the site
here a live deploy of the project can be used, it may take some time for the app to "wake up" as it is hosted on
a free charge heroku tier, showing a wrong date and temperature as a result but it should wake up after 1min of
the site loading. After that the site should be working as expected. Showing the correct date and temperatures.
It should be noted that it works best on Chrome as WebGL is highly experimental.

![Desktop](https://media.giphy.com/media/Wn127Ml0olaaSVefv0/giphy.gif)

![App](https://media.giphy.com/media/XzeeDde0WmYMR8zWCp/giphy.gif)

## Installation

clone the project

```bash
cd lazy-weather
npm install
```

## Usage

```node
node index.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)