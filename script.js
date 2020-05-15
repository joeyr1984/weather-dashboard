var cityName, todaysForecast, dayOne, dayTw0, dayThree, dayFour, dayFive;


$(document).ready(function () {
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const units = "imperial";
    const apiKey = "59cf0d27eea117f08fb58b5f7644dbcd";

    function searchForCity(cityName) {
        $.ajax({
            url: apiUrl + cityName + '&units=' + units + '&appid=' + apiKey,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            cityName = response.city.name;
            todaysForecast = response.list[0];
            dayOne = response.list[1];
            dayTw0 = response.list[2];
            dayThree = response.list[3];
            dayFour = response.list[4];
            dayFive = response.list[5];

            updateTodaysForecast(cityName, todaysForecast);
        });
    }
    searchForCity('sedona');
});

function updateTodaysForecast(city, weather) {
    $('#city-name').html(city + ' (' + moment(new Date(weather.dt * 1000)).format('MM/DD/YYYY') + ') <img src="http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png"/>');
    $('#temp').html('Temperature: ' + weather.main.temp + ' °F');
    $('#humidity').html('Humidity: ' + weather.main.humidity + ' %');
    $('#wind-speed').html('Wind Speed: ' + weather.wind.speed + ' MPH');
}