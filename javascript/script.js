const timeEl               = document.getElementById('time');
const dateEl               = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Clock (updates every second) ─────────────────────────────────────────────
setInterval(function () {
    const t    = new Date();
    const hour = t.getHours();
    const h12  = hour >= 13 ? hour % 12 : hour;
    const min  = t.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    if (timeEl) {
        timeEl.innerHTML = (h12 < 10 ? '0' + h12 : h12) + ':' + (min < 10 ? '0' + min : min) + ' <span id="am-pm">' + ampm + '</span>';
    }
    if (dateEl && !window._navSlogan) {
        dateEl.textContent = days[t.getDay()] + ', ' + t.getDate() + ' ' + months[t.getMonth()];
    }
}, 1000);

// ── Weather fetch (Open-Meteo — free, no API key) ────────────────────────────
// Toluca Lake, CA: lat 34.1567, lon -118.3513
(function fetchNavWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=34.1567&longitude=-118.3513&current=temperature_2m,weather_code,windspeed_10m&temperature_unit=fahrenheit')
        .then(function (r) { return r.json(); })
        .then(function (d) {
            var temp      = Math.round(d.current.temperature_2m);
            var code      = (d.current.weather_code != null ? d.current.weather_code : d.current.weathercode);
            var desc      = getWeatherDesc(code);
            var stateClass = getWeatherClass(code);

            // Big temperature number in nav
            var tempEl = document.querySelector('.today .temp');
            if (tempEl) tempEl.textContent = temp + '\u00B0F';

            // Condition label below date
            if (currentWeatherItemsEl) currentWeatherItemsEl.textContent = desc;

            // Swap weather class on the sun disc
            var sun = document.getElementById('nav-sun');
            if (sun) {
                sun.className = 'disc-container ' + stateClass;
            }
        })
        .catch(function () {
            // silently fail — clock still runs
        });
}());

// ── Weather helpers ───────────────────────────────────────────────────────────
function getWeatherDesc(c) {
    if (c === 0)  return 'Clear Sky';
    if (c <= 3)   return 'Partly Cloudy';
    if (c <= 48)  return 'Foggy';
    if (c <= 57)  return 'Light Drizzle';
    if (c <= 67)  return 'Rainy';
    if (c <= 77)  return 'Snowy';
    if (c <= 82)  return 'Rain Showers';
    return 'Thunderstorm';
}

function getWeatherClass(c) {
    if (c === 0)  return 'weather-sunny';
    if (c <= 3)   return 'weather-cloudy';
    if (c <= 48)  return 'weather-foggy';
    if (c <= 77)  return 'weather-rainy';
    if (c <= 82)  return 'weather-rainy';
    return 'weather-stormy';
}
