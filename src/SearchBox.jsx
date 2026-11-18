import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import './SearchBox.css'
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city,setCity] = useState("");
    let [error,setError] = useState("");
    let [loading, setLoading] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather"
    let API_KEY =  import.meta.env.VITE_WEATHER_API_KEY;

    let getWeatherInfo = async (params)=>{
           let response = await fetch(`${API_URL}?${params}&appid=${API_KEY}&units=metric`);
            
           if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please enter a valid city.");
            }

            throw new Error("Unable to fetch weather information.");
           }

            let jsonResponse = await response.json();

            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].main
            
            }
           return result;
      
    }
    
    let handleChange = (evt) => {
       setCity(evt.target.value);
       setError("");
    }

    let handleSubmit = async (evt) => {
        evt.preventDefault();

         if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }

        try{
             setLoading(true);
             setError("");

             let newInfo = await getWeatherInfo(`q=${encodeURIComponent(city.trim())}`);

             updateInfo(newInfo);
             setCity("");
        }catch(err){
          setError(err.message);
        }finally {
          setLoading(false);
     }
      
    }


let getCurrentLocation = () => {

    if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            try {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let newInfo = await getWeatherInfo(
                    `lat=${lat}&lon=${lon}`
                );

                updateInfo(newInfo);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },

        (err) => {
            if (err.code === 1) {
                setError("Location permission denied.");
            } else if (err.code === 2) {
                setError("Location information unavailable.");
            } else {
                setError("Location request timed out.");
            }

            setLoading(false);
        },

        {
            enableHighAccuracy: false,
            timeout: 10000
        }
    );
};

 
return (
    <div className="SearchBox">
        <form className="search-form" onSubmit={handleSubmit}>

            <TextField
                className="city-input"
                id="city"
                label="Enter city name"
                variant="outlined"
                value={city}
                onChange={handleChange}
                required
            />

            <Button
                className="search-button"
                type="submit"
                variant="contained"
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={22} color="inherit" />
                ) : (
                    "Search"
                )}
            </Button>

            <Button
                className="location-button"
                variant="outlined"
                onClick={getCurrentLocation}
                disabled={loading}
            >
                Use My Location
            </Button>

            {error && (
                <p className="error-message">{error}</p>
            )}

        </form>
    </div>
);

}