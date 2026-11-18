
import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city: "Mangalore",
        feelsLike: 30.02,
        humidity: 33,
        temp: 30.99,
        tempMax: 30.99,
        tempMin: 30.94,
        weather: "Smoke"
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div className="weather-app">

            <header className="weather-header">
                <h1>Weather Dashboard</h1>
                <p>Check the weather anywhere in the world</p>
            </header>

            <main className="weather-main">

                <section className="search-section">
                    <SearchBox updateInfo={updateInfo} />
                </section>

                <section className="weather-section">
                    <InfoBox info={weatherInfo} />
                </section>

            </main>

        </div>
    );
}
