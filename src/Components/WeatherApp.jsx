import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css'; // Import your CSS file for custom styles

function WeatherApp() {
  const [city, setCity] = useState('Madrid');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Your OpenWeatherMap API key
  const apiKey = 'edda7f49d17e416522f7ef10a3a2a63f';

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setError('Error fetching weather data');
        }
      } catch (error) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === '200') {
          setForecastData(data);
        }
      } catch (error) {
        setError('Error fetching forecast data');
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [city]);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const filterHourlyForecastForToday = () => {
    if (!forecastData || !forecastData.list) return [];

    const currentDateTime = new Date(); // Current date and time in the local timezone

    // Create an array to store hourly forecast data
    const hourlyForecast = [];

    // Loop through forecast data to find hourly forecasts for the next 24 hours
    for (const forecast of forecastData.list) {
      const forecastDateTime = new Date(forecast.dt * 1000); // Convert forecast time to JavaScript Date object

      // Check if the forecast time is within the next 24 hours
      if (forecastDateTime >= currentDateTime && forecastDateTime < currentDateTime.getTime() + 24 * 60 * 60 * 1000) {
        hourlyForecast.push(forecast);
      }
    }

    return hourlyForecast;
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return 'bi-sun-fill text-warning';
      case 'Clouds':
        return 'bi-cloud-fog2-fill text-secondary';
      case 'Rain':
        return 'bi-cloud-drizzle-fill text-info';
      case 'Drizzle':
        return 'bi-cloud-drizzle-fill text-info';
      case 'Mist':
        return 'bi-cloud-fog2-fill text-secondary';
      case 'Thunderstorm':
        return 'bi-cloud-lightning-fill text-primary';
      default:
        return 'bi-question-circle-fill';
    }
  };

  // Filter the forecast data to show only the first 7 days
  const filteredForecastData = forecastData ? forecastData.list.filter((forecast, index) => index % 8 === 0) : [];

  return (
    <div className="container-fluid bg-black text-white">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-12 bg-black text-white text-center">
          <h4 className="text-primary mb-4 weather-heading ">Weather App</h4>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5 bg-black text-white">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-md-7 rounded-4">
          <div className="weather-details p-4 bg-black rounded">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            {weatherData && (
              <div className='d-flex justify-content-around rounded'>
                <div className='justify-content-center m-5 my-2'>
                  <h2 className='py-2 madrid'>{weatherData.name}</h2>
                  <p className='py-2'>Chance of rain: {weatherData.main.humidity}%</p>
                  <h1 className='my-3'>{Math.round(weatherData.main.temp - 273.15)}°C</h1>
                </div>
                <div className='m-4 big-icon'>
                  <i className={`bi ${getWeatherIcon(weatherData.weather[0].main)} centericon icon-shadow`}></i>
                </div>
              </div>
            )}
          </div>
          <div className="forecast p-4 mt-5 bgdark rounded-2">
            <h5 className='my-3 days'>Hourly Forecast Today</h5>
            <div className='d-flex justify-content-around'>
              {filterHourlyForecastForToday().map((forecast, index) => (
                <div key={index} className="forecast-items justify-content-around">
                  <p className='px-2 mx-3'>{forecast.dt_txt.slice(11, 16)}</p>
                  <i className={`bi ${getWeatherIcon(forecast.weather[0].main)} px-3`}></i>
                  <p className='my-3 px-2 mx-3'>{Math.round(forecast.main.temp - 273.15)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-3 bgdark rounded">
          <div className="forecast p-4">
            <h5 className='my-3 days'>7-Day Forecast</h5>
            {filteredForecastData.map((forecast, index) => (
                <div key={index} className="forecast-item d-flex justify-content-around  py-2">
  <p>{getDayName(forecast.dt_txt)}</p> {/* Display day name instead of date */}
  <i className={`bi ${getWeatherIcon(forecast.weather[0].main)} text-center`}></i>
  <p>{Math.round(forecast.main.temp - 273.15)}°C</p>
</div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
