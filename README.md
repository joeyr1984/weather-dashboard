# Weather-dashboard

The intended functionality of this app is to allow the user to search for a city and be presented with the current days forecast as well as a five day forcast.

To accomplish this I used bootstrap, symantic HTML, jquery and open weather API

The end result is a working app that is also responisive. 

## an example of code that demonstrates how i got the uv index to work

```javascript
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
```
## Link for deployed app

https://joeyr1984.github.io/weather-dashboard/

## GIF of working app
![weatherGif](./images/weather.gif)