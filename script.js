const api = {
    key: 'ec317ea38bff17a61fbf10d553d47087',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery)

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}<span>°C / ${Math.round(weather.main.temp_max)}°C</span>`;
}

function dateBuilder(b) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[b.getDay()];
    let date = b.getDate();
    let month = months[b.getMonth()] ;
    let year = b.getFullYear();

    return `${day} ${date} ${month} ${year}`
}