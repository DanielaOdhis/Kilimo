import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const api = {
  key: "f95d5549ea524dc69e1c07b7d2d3fe1e	",
  base: "https://api.weatherbit.io/v2.0/forecast/daily"
}

export default function Home(){
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
  return (
    <div className='back'>
      <nav >
        <br/>
        {/*<Link to={'/Weather-Forecast'} className="link">Weather Forecast</Link>*/}
      </nav>
    <div className="text" >
      <h1>Welcome to Kilimo</h1>
      <div className='kili'>
      <p>🌾 Welcome to Our Agricultural Oasis! 🌱 <br />Step into a world where fertile fields stretch as far as the eye can see and where the rhythm of nature sets the pace. Our page is your gateway to a universe of sustainable cultivation, abundant harvests, and the evergreen wisdom of the land.</p> <hr />
      <p>🌍 Our Mission of Sustainability <br />Discover how we're shaping the future of agriculture by blending tradition with innovation. We're dedicated to sustainable practices that preserve the environment, empower local farmers, and ensure a steady supply of nourishing produce for generations to come.</p> <hr />
      </div>
      <div className="die"><br/><br/>
      <p className="push">🌤️ Weather Insights: Your Forecasting Companion ☔<br /> Welcome to our enhanced Agricultural Landing Page, now featuring a cutting-edge Weather Forecasting Section designed to empower your agricultural decisions. Harness the power of weather knowledge to cultivate smarter, adapt quicker, and ensure the healthiest yields from your fields.</p>
      <div>
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
      </div> <br /> <br />
    </div>
    <div className="irri">
      <div className="box">
      <p>Worry when to Irrigate your farm? We got you! Soil Moisture: Water when soil is moderately dry, not parched. Visual Signs Irrigate when plants show wilting, drooping leaves, or color change. Time of Day: Water in early morning or late afternoon to minimize evaporation.</p>
      </div>
      <div className="box">
      <p>Weather Conditions: Skip watering if rain is expected; more on hot, windy days. Plant Growth Stage: Adjust watering based on growth stages. Type of Soil: Sandy soils need more frequent watering; clay soils retain water longer. Evapotranspiration (ET):Monitor soil evaporation and plant transpiration rates.</p>
      </div>
      <div className="box">
      <p>Finger Test: Check soil moisture by inserting a finger into the soil. Weight Test: Lift containers to gauge soil moisture. Mulching: Apply mulch to retain soil moisture and regulate temperature. Drip Line Observation: Adjust drip irrigation for even moisture distribution.</p>
      </div>
    </div>
    <div className="assist"><br />
      <p>🤖 Meet AgriBot: Your Farming Assistant 🌾<br/> Step into the future of agricultural support with the introduction of AgriBot, your friendly and knowledgeable chatbot, right here on page. Whether you're a seasoned farmer seeking insights or a curious enthusiast with questions, AgriBot is your 24/7 companion, ready to assist, guide, and share valuable information.</p> <br />
      <div className="jaba">
      <p className="half">No more waiting for office hours or searching through pages of content. AgriBot is always ready to provide instant answers to your inquiries, ensuring you get the information you need when you need it.</p>
      <div className='tab'>
        <div className="wed">
          <p>INSTANT ANSWERS ANYTIME <br />SEARCH MADE SIMPLE</p>
          <button><Link to={`/Bot`} className="link">Get Started</Link></button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}