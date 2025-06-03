// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState({});
//   const [location, setLocation] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [unit, setUnit] = useState('metric');

//   const apiKey = '101fb5d2a7ee8654ce81b36377fcedac';
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       setLoading(true);
//       setError('');
//       axios
//         .get(url)
//         .then((response) => {
//           setData(response.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError('City not found. Please try again.');
//           setData({});
//           setLoading(false);
//         });
//       setLocation('');
//     }
//   };

//   const toggleUnit = () => {
//     setUnit(unit === 'metric' ? 'imperial' : 'metric');
//   };

//   const unitSymbol = unit === 'metric' ? '°C' : '°F';

//   return (
//     <div className="app">
//       <div className="search">
//         <input
//           value={location}
//           onChange={(event) => setLocation(event.target.value)}
//           onKeyPress={searchLocation}
//           placeholder="Enter Location"
//           type="text"
//         />
//         <div className="unit-toggle">
//           <label className="switch">
//             <input type="checkbox" onChange={toggleUnit} />
//             <span className="slider round"></span>
//           </label>
//           <span className="unit-label">°C / °F</span>
//         </div>
//       </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {loading && <p>Loading...</p>}

//       {!loading && data.main && (
//         <div className="container">
//           <div className="top">
//             <div className="location">
//               <p>{data.name}</p>
//             </div>

//             <div className="temp">
//               <h1>{data.main.temp}{unitSymbol}</h1>
//             </div>

//             <div className="description">
//               <p>{data.weather[0].main}</p>
//             </div>
//           </div>

//           <div className="bottom">
//             <div className="feels">
//               <p className="bold">{data.main.feels_like}{unitSymbol}</p>
//               <p>Feels Like</p>
//             </div>
//             <div className="humidity">
//               <p className="bold">{data.main.humidity}%</p>
//               <p>Humidity</p>
//             </div>
//             <div className="wind">
//               <p className="bold">{data.wind.speed} {unit === 'metric' ? 'm/s' : 'MPH'}</p>
//               <p>Wind Speed</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const AppWrapper = styled.div`
  font-family: 'Outfit', 'Poppins', sans-serif;
  background: #000;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 1rem;

  ::before {
    content: '';
    background: url('assets/sunset.jpg') no-repeat center center/cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const SearchBox = styled.div`
  text-align: center;
  padding: 1rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 80%;
  max-width: 400px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }
  ::placeholder {
    color: #f0f0f0;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  span:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + span {
    background-color: #2196f3;
  }
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const Top = styled.div`
  width: 100%;
  text-align: center;
`;

const Temp = styled.h1`
  font-size: 6rem;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ccc;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 12px;
  gap: 1rem;
`;

const DataBlock = styled.div`
  flex: 1;
  min-width: 100px;
`;

const BoldText = styled.p`
  font-weight: 700;
  font-size: 1.6rem;
`;

const UnitLabel = styled.span`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 500;
`;

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
        .catch(() => {
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
    <AppWrapper>
      <SearchBox>
        <Input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <ToggleWrapper>
          <Switch>
            <input type="checkbox" onChange={toggleUnit} />
            <span className="slider round"></span>
          </Switch>
          <UnitLabel>°C / °F</UnitLabel>
        </ToggleWrapper>
      </SearchBox>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && data.main && (
        <Container>
          <Top>
            <p>{data.name}</p>
            <Temp>{data.main.temp}{unitSymbol}</Temp>
            <Description>{data.weather[0].main}</Description>
          </Top>
          <Bottom>
            <DataBlock>
              <BoldText>{data.main.feels_like}{unitSymbol}</BoldText>
              <p>Feels Like</p>
            </DataBlock>
            <DataBlock>
              <BoldText>{data.main.humidity}%</BoldText>
              <p>Humidity</p>
            </DataBlock>
            <DataBlock>
              <BoldText>{data.wind.speed} {unit === 'metric' ? 'm/s' : 'MPH'}</BoldText>
              <p>Wind Speed</p>
            </DataBlock>
          </Bottom>
        </Container>
      )}
    </AppWrapper>
  );
}

export default App;

