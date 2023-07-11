import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';

function App() {

const [currentWeather, setCurrentWeather] = useState(null);
const [Forecast, setForecast] = useState(null);


const handleOnSearchChange = (searchData) => {
  const [ lat, lon ] = searchData.value.split(" ");

  const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

  Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (res) => {
      const weatherResponse = await res[0].json();
      const forecastResponse = await res[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));
}

console.log(currentWeather);
console.log(Forecast);


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
