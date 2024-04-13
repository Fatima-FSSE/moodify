import React from 'react';
import './WeatherBar.css';
import search from '../Assets/search.png';
import clear from  '../Assets/clear.png';
import cloudy from '../Assets/cloudy.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import windy from '../Assets/windy.png';
import uvIndex from '../Assets/uv-index.png';
import precipitation from '../Assets/precipitation.png';
import visibility from '../Assets/visibility.png';
import temprature from '../Assets/temprature.png';

function WeatherBar() {

    return ( 
   <div className='weather-bar-container'>
      <div className='container'>
         <div className='search-bar'>
            <input type="text" className='search-city' placeholder='search city'/>
            <img className='search-img' src={search} alt="seach Icon" />
         </div>
      </div>
      <div className='weather-div'>
         <div className='forecast-div'>
           <div className='location-text'>
             <h1>London</h1>
           </div> 
           <img className='weather-icon forecast-icon' src={cloudy} alt="weather forecast" /> 
           <h1 className='temp-txt'>24&#176;C</h1>
         </div>
         <div className='forecast-div'>
               <img className='forecast-icon' src={humidity} alt="weather forecast" />
               <div className='humidity-text'>
                  <h1>64%</h1>
                  <h1>Humidity</h1>
               </div>
         </div>
         <div className='forecast-div'>
               <img className='forecast-icon' src={windy} alt="weather forecast" />
               <div className='wind-text'>
                  <h1>18 km/h</h1>
                  <h1>Wind speed</h1>
               </div>
         </div>
         <div className='forecast-div'>
               <img className='forecast-icon' src={uvIndex} alt="weather forecast" />
               <div className='uvIndex-text'>
                  <h1>7</h1>
                  <h1>UV INDEX</h1>
               </div>
         </div>
         <div className='forecast-div'>
               <img className='forecast-icon' src={precipitation} alt="weather forecast" />
               <div className='uvIndex-text'>
                  <h1>0"</h1>
                  <h1>in last 24h</h1>
               </div>
         </div>
         <div className='forecast-div'>
               <img className='forecast-icon' src={visibility} alt="weather forecast" />
               <div className='visibility-text'>
                  <h1>15</h1>
                  <h1>mile</h1>
               </div>
         </div>  
         <div className='forecast-div'>
               <img className='forecast-icon' src={temprature} alt="weather forecast" />
               <div className='feelsLike-text'>
                  <h1>24&#176;C</h1>
                  <h1>Feels like</h1>
               </div>
         </div>        
      </div>    
   </div>
    );

}

export default WeatherBar;