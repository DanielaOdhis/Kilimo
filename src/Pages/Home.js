import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const api = {
    key: "f95d5549ea524dc69e1c07b7d2d3fe1e	",
    base: "https://api.weatherbit.io/v2.0/forecast/daily"
  }

export default function Home(){
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
  
    const search = evt => {
      if (evt.key === 'Enter') {
        fetch(`${api.base}?city=${query}&key=${api.key}&units=metric`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
      }
    };
  
    const dateBuilder = d => {
      let months = [
        'January','February','March', 'April','May','June','July','August','September','October','November','December'
      ];
      let days = [
        'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
      ];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`;
    };
  
    return(
        <div>
        <h1>Welcome to Kilimo</h1>
        <nav>
          <Link to={`/Bot`}>ChatBot</Link>
        </nav>
        <div>
        <div
      className={
        typeof weather.main !== 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
        </div>
      </div>
    )
}