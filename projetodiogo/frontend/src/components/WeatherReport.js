import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherReport = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/weather/report')
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the weather data!", error);
            });
    }, []);

    return (
        <div>
            <h1>Weather Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Min Temp</th>
                        <th>Max Temp</th>
                        <th>Conditions</th>
                        <th>Wind Speed</th>
                        <th>Wind Direction</th>
                        <th>Precipitation Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData.map((weather, index) => (
                        <tr key={index}>
                            <td>{weather.forecast_date}</td>
                            <td>{weather.min_temp}°C</td>
                            <td>{weather.max_temp}°C</td>
                            <td>{weather.weather_conditions}</td>
                            <td>{weather.wind_speed} km/h</td>
                            <td>{weather.wind_direction}</td>
                            <td>{weather.precipitation_probability}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeatherReport;
