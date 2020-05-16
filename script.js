var cityName, todaysForecast, listOfCities, dayOne, dayTw0, dayThree, dayFour, dayFive;

const fiveDayForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
const currentWeatherForecastApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const uvIndexApi = "http://api.openweathermap.org/data/2.5/uvi?";
const units = "imperial";
const apiKey = "59cf0d27eea117f08fb58b5f7644dbcd";
$(document).ready(function () {
    listOfCities = [];
    loadWeatherDashboard();
    $('#search-button').on('click', function () {
        cityName = $('#search-city').val();
        $('#search-city').val('');
        $('#uv-index').removeClass();
        $('#uv-index').addClass('badge');
        searchTodaysForecast(cityName);
        searchFiveDayForecast(cityName);
    })
});
function loadWeatherDashboard() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.listOfCities) {
            listOfCities = JSON.parse(localStorage.listOfCities);
            listOfCities.forEach(function (city) {
                var cityButtonHtml = '<button type="button" id="' + city + '" class="list-group-item list-group-item-action">' + city + ' </button>';
                $('#search-history').append(cityButtonHtml);
                $('#' + city).on('click', function () {
                    $('#uv-index').removeClass();
                    $('#uv-index').addClass('badge');
                    searchTodaysForecast(city);
                    searchFiveDayForecast(city);
                });
            });
            searchTodaysForecast(listOfCities[listOfCities.length - 1]);
            searchFiveDayForecast(listOfCities[listOfCities.length - 1]);
        } else {
            searchTodaysForecast('sedona');
            searchFiveDayForecast('sedona');
        }
    }
}
function saveToStorage(city) {
    var cityButtonHtml = '<button type="button" id="' + city + '" class="list-group-item list-group-item-action">' + city + ' </button>';
    if (typeof (Storage) !== "undefined") {
        if (localStorage.listOfCities) {
            var savedCities = JSON.parse(localStorage.listOfCities);
            if (!savedCities.includes(city)) {
                $('#search-history').append(cityButtonHtml);
                $('#' + city).on('click', function () {
                    $('#uv-index').removeClass();
                    $('#uv-index').addClass('badge');
                    searchTodaysForecast(city);
                    searchFiveDayForecast(city);
                });
                listOfCities.push(city);
                savedCities.push(city);
                localStorage.listOfCities = JSON.stringify(savedCities);
            }

        } else {
            $('#search-history').append(cityButtonHtml);
            $('#' + city).on('click', function () {
                $('#uv-index').removeClass();
                $('#uv-index').addClass('badge');
                searchTodaysForecast(city);
                searchFiveDayForecast(city);
            });
            listOfCities.push(city);
            localStorage.listOfCities = JSON.stringify(listOfCities);
        }
    }
}
function searchTodaysForecast(cityName) {
    $.ajax({
        url: currentWeatherForecastApiUrl + cityName + '&units=' + units + '&appid=' + apiKey,
        method: 'GET'
    }).then(function (response) {
        //console.log(response);
        saveToStorage(cityName);
        updateTodaysForecast(response);
        getUvIndex(response.coord.lat, response.coord.lon);
    }).catch(error => alert(error.responseJSON.message));
}
function getUvIndex(lat, lon) {
    $.ajax({
        url: uvIndexApi + 'appid=' + apiKey + '&lat=' + lat + '&lon=' + lon,
        method: 'GET'
    }).then(function (response) {
        $('#uv-index').text(response.value);
        if ((response.value >= 0) && response.value < 3) {
            $('#uv-index').addClass('badge-success');
        } else if ((response.value >= 3) && response.value < 8) {
            $('#uv-index').addClass('badge-warning');
        } else if (response.value >= 8) {
            $('#uv-index').addClass('badge-danger');
        }
    }).catch(error => alert(error.responseJSON.message));
}

function searchFiveDayForecast(cityName) {
    $.ajax({
        url: fiveDayForecastApiUrl + cityName + '&units=' + units + '&appid=' + apiKey,
        method: 'GET'
    }).then(function (response) {
        //console.log(response);
        dayOne = response.list[3];
        dayTwo = response.list[11];
        dayThree = response.list[19];
        dayFour = response.list[27];
        dayFive = response.list[35];
        updateFiveDayForecast(dayOne, dayTwo, dayThree, dayFour, dayFive);
    }).catch(error => console.log(error));
}
function updateTodaysForecast(weather) {
    //console.log(weather);
    $('#city-name').html(weather.name + ' (' + moment(new Date(weather.dt * 1000)).format('MM/DD/YYYY') + ') <img src="http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png" alt="' + weather.weather[0].description + '" />');
    $('#temp').html('Temperature: ' + weather.main.temp + ' °F');
    $('#humidity').html('Humidity: ' + weather.main.humidity + ' %');
    $('#wind-speed').html('Wind Speed: ' + weather.wind.speed + ' MPH');
}
function updateFiveDayForecast(one, two, three, four, five) {
    //DAY ONE FORECAST
    $('#day-one-date').text(moment(new Date(one.dt * 1000)).format('MM/DD/YYYY'));
    $('#day-one-icon').attr({
        src: 'http://openweathermap.org/img/wn/' + one.weather[0].icon + '.png',
        alt: one.weather[0].description
    })
    $('#day-one-temp').text('Temp: ' + one.main.temp + ' °F');
    $('#day-one-humidity').text('Humidity: ' + one.main.humidity + ' %');
    //DAY TWO FORECAST
    $('#day-two-date').text(moment(new Date(two.dt * 1000)).format('MM/DD/YYYY'));
    $('#day-two-icon').attr({
        src: 'http://openweathermap.org/img/wn/' + two.weather[0].icon + '.png',
        alt: two.weather[0].description
    })
    $('#day-two-temp').text('Temp: ' + two.main.temp + ' °F');
    $('#day-two-humidity').text('Humidity: ' + two.main.humidity + ' %');
    //DAY THREE FORECAST
    $('#day-three-date').text(moment(new Date(three.dt * 1000)).format('MM/DD/YYYY'));
    $('#day-three-icon').attr({
        src: 'http://openweathermap.org/img/wn/' + three.weather[0].icon + '.png',
        alt: three.weather[0].description
    })
    $('#day-three-temp').text('Temp: ' + three.main.temp + ' °F');
    $('#day-three-humidity').text('Humidity: ' + three.main.humidity + ' %');
    //DAY FOUR FORECAST
    $('#day-four-date').text(moment(new Date(four.dt * 1000)).format('MM/DD/YYYY'));
    $('#day-four-icon').attr({
        src: 'http://openweathermap.org/img/wn/' + four.weather[0].icon + '.png',
        alt: four.weather[0].description
    })
    $('#day-four-temp').text('Temp: ' + four.main.temp + ' °F');
    $('#day-four-humidity').text('Humidity: ' + four.main.humidity + ' %');
    //DAY FIVE FORECST
    $('#day-five-date').text(moment(new Date(five.dt * 1000)).format('MM/DD/YYYY'));
    $('#day-five-icon').attr({
        src: 'http://openweathermap.org/img/wn/' + five.weather[0].icon + '.png',
        alt: five.weather[0].description
    })
    $('#day-five-temp').text('Temp: ' + five.main.temp + ' °F');
    $('#day-five-humidity').text('Humidity: ' + five.main.humidity + ' %');
}