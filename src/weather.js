export async function getCityName() {
    try {
        const result = await fetch(`https://get.geojs.io/v1/ip/geo.json`)
            .then(response => response.json()).then(data => data.city);
        return result;

    } catch (err) {
        return 'город не найден';
    }
}

export async function drawCity(el, result) {
    el.innerHTML = await result;
}

export async function getWeather(result) {
    const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${result}&appid=d26008b5ef954ff8cd8cdefb3d851e73`).then(response => response.json());
    return weather.main.temp_min;
}

export async function drawWeather(el, result) {
    el.innerHTML = await result;
}

async function getIconWeatherFromApi(city) {
    const weatherIconId = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=d26008b5ef954ff8cd8cdefb3d851e73`).then(response => response.json());
    return weatherIconId.weather[0].icon;
}

export async function getUrlIcon(city) {
    const iconName = await getIconWeatherFromApi(city);
    const icon = `<img src="https://openweathermap.org/img/wn/${iconName}@2x.png">`;

    return icon;
}

export async function drawIcon(el, result) {
    el.innerHTML = await result;
}