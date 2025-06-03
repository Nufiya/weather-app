import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');

  const apiKey = '101fb5d2a7ee8654ce81b36377fcedac';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError('');
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('City not found. Please try again.');
          setData({});
          setLoading(false);
        });
      setLocation('');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <div className="unit-toggle">
          <label className="switch">
            <input type="checkbox" onChange={toggleUnit} />
            <span className="slider round"></span>
          </label>
          <span className="unit-label">°C / °F</span>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && data.main && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>

            <div className="temp">
              <h1>{data.main.temp}{unitSymbol}</h1>
            </div>

            <div className="description">
              <p>{data.weather[0].main}</p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like}{unitSymbol}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed} {unit === 'metric' ? 'm/s' : 'MPH'}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
