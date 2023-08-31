import React, {useState} from 'react';

const api = {
    key: "f95d5549ea524dc69e1c07b7d2d3fe1e	",
    base: "https://api.weatherbit.io/v2.0/forecast/daily"
  }

export default function Weather(){
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 17);
      };

      const handlePreviousClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 17) % 17);
      };

    return(
        <div className='c-container'>
            <div className="irrigate">
                <h2>Worry when to Irrigate your farm?</h2>
                <h4 className='italic'>We got you!</h4>< br />
                <ul>
                    <li>Soil Moisture: Water when soil is moderately dry, not parched.</li>
                    <li>Visual Signs Irrigate when plants show wilting, drooping leaves, or color change.</li>
                    <li>Time of Day: Water in early morning or late afternoon to minimize evaporation.</li>
                    <li>Weather Conditions: Skip watering if rain is expected; more on hot, windy days.</li>
                    <li>Plant Growth Stage: Adjust watering based on growth stages.</li>
                    <li>Type of Soil: Sandy soils need more frequent watering; clay soils retain water longer.</li>
                    <li>Evapotranspiration (ET):Monitor soil evaporation and plant transpiration rates.</li>
                    <li>Finger Test: Check soil moisture by inserting a finger into the soil.</li>
                    <li>Weight Test: Lift containers to gauge soil moisture.</li>
                    <li>Mulching: Apply mulch to retain soil moisture and regulate temperature.</li>
                    <li>Drip Line Observation:Adjust drip irrigation for even moisture distribution.</li>
                    <li>Crop Water Requirements:Research specific water needs of different crops.</li>
                </ul>
            </div>
            <div className="mar">
                <h3>Weather Forecast for Major Cities</h3><br />
                <p className='italic'>Covers 16 days from today.</p>
            </div>
        <div
          className={
            typeof weather.data !== 'undefined' && weather.data[currentIndex].temp > 16
              ? 'app warm'
              : 'app'
          }
        >
          <main className="main">
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
            <div className="slideshow-controls">
              {currentIndex > 0 && (
                <button onClick={handlePreviousClick}>&lt; Previous</button>
              )}
              {currentIndex < 15 && (
                <button onClick={handleNextClick}>Next &gt;</button>
              )}
            </div>
            {typeof weather.data !== 'undefined' ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.city_name}, {weather.country_code}
                  </div>
                  <div className="date">
                    {dateBuilder(new Date(weather.data[currentIndex].valid_date))}
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.data[currentIndex].temp)}°C
                  </div>
                  <div className="weather">
                    {weather.data[currentIndex].weather.description}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </main>
        </div>
      </div>
    )
}