import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const WeatherReport = () => {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    // Busca os dados do backend
    axios.get('/api/weather/reports')
      .then(response => setForecasts(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  const chartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: forecasts.map(forecast => forecast.date),
    },
    series: [
      {
        name: 'Min Temp',
        data: forecasts.map(forecast => forecast.minTemp),
      },
      {
        name: 'Max Temp',
        data: forecasts.map(forecast => forecast.maxTemp),
      },
    ],
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <Chart options={chartOptions} series={chartOptions.series} type="line" />
      <ul>
        {forecasts.map(forecast => (
          <li key={forecast.id}>
            {forecast.date}: {forecast.condition} - {forecast.minTemp}°C / {forecast.maxTemp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherReport;
