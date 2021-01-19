const api ={
    key: "26803ac8197efbb2bd778378bf8f23ca",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode==13){
        getResults(searchbox.value);   
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML= `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(weather.main.temp)}°C `;
    let now= new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML= dateBuilder(now);
    let w = document.querySelector('.current .weather');
    w.innerHTML= `${weather.weather[0].description} `;
    let hi_low = document.querySelector('.current .hi-low');
    hi_low.innerHTML= `${Math.round(weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`;

}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}: ${date} ${month} ${year}`;
}