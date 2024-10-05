const express = require('express');
const axios = require('axios');
const prisma = require('../prisma/client');
const router = express.Router();

// Substitua pela sua API_KEY da Meteoblue
const API_KEY = '5CGogbNLdsB2Rt9q';

router.post('/fetch-weather', async (req, res) => {
  const { city, latitude, longitude } = req.body;
  let apiUrl = `https://api.meteoblue.com/weather-api/v3/forecast?apikey=${API_KEY}`;

  if (city) {
    apiUrl += `&city=${city}`;
  } else if (latitude && longitude) {
    apiUrl += `&lat=${latitude}&lon=${longitude}`;
  }

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Salve os dados no banco de dados
    const savedData = await prisma.weatherForecast.create({
      data: {
        date: new Date(weatherData.forecast.date),
        minTemp: weatherData.forecast.minTemp,
        maxTemp: weatherData.forecast.maxTemp,
        condition: weatherData.forecast.condition,
        windSpeed: weatherData.forecast.wind.speed,
        windDirection: weatherData.forecast.wind.direction,
        precipitation: weatherData.forecast.precipitation,
        humidity: weatherData.forecast.humidity,
      },
    });

    res.status(200).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;