//Get the API Key from apiweather.org
const apiKey = 'b8091d2c605ef050421d5a0bbb93ef12';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ 
  extended: true })
);

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        var temp = (weather.main.temp - 32) * (5/9);
        temp = +temp.toFixed(2);
        let weatherText = `The temperature is ${temp}°C/${weather.main.temp}°F in ${weather.name}. The humidity is ${weather.main.humidity}%. The wind speed is ${weather.wind.speed} mph.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
