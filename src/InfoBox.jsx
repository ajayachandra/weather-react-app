
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import "./InfoBox.css";

import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SunnyIcon from '@mui/icons-material/Sunny';

export default function InfoBox({ info }) {

    let RAIN_URL = "https://images.unsplash.com/photo-1620385019253-b051a26048ce?w=700&auto=format&fit=crop&q=60";

    let HOT_URL = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?q=80&w=1740&auto=format&fit=crop";

    let COLD_URL = "https://plus.unsplash.com/premium_photo-1671127303910-754ac2224c7a?w=700&auto=format&fit=crop&q=60";

    let WeatherIcon =
        info.humidity > 80
            ? ThunderstormIcon
            : info.temp > 15
            ? SunnyIcon
            : AcUnitIcon;

    let image =
        info.humidity > 80
            ? RAIN_URL
            : info.temp > 15
            ? HOT_URL
            : COLD_URL;

    return (
        <div className="InfoBox">

            <Card className="weather-card">

                {/* Weather background image */}
                <CardMedia
                    component="div"
                    className="weather-banner"
                    image={image}
                >
                    <div className="weather-banner-overlay">
                        <p>WEATHER OVERVIEW</p>
                        <h2>{info.city}</h2>
                        <span>{info.weather}</span>
                    </div>
                </CardMedia>

                <CardContent className="weather-card-content">

                    {/* Temperature */}
                    <div className="weather-temperature">

                        <WeatherIcon className="main-weather-icon" />

                        <h1>{Math.round(info.temp)}°C</h1>

                    </div>

                    {/* Weather details */}
                    <div className="weather-details">

                        <div className="weather-detail">
                            <span>Feels Like</span>
                            <h3>{info.feelsLike}°C</h3>
                        </div>

                        <div className="weather-detail">
                            <span>Humidity</span>
                            <h3>{info.humidity}%</h3>
                        </div>

                        <div className="weather-detail">
                            <span>Min Temperature</span>
                            <h3>{info.tempMin}°C</h3>
                        </div>

                        <div className="weather-detail">
                            <span>Max Temperature</span>
                            <h3>{info.tempMax}°C</h3>
                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}
