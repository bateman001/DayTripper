//JavaScript Document
//
//WEATHER API INFO
//weather api key: c13d4b80ab21751c22f9351b411259d7
//3 weather options: current, 10 day forecast, 30 day 
//Same Day Forecast url: api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
//Within 16 Day Forecast: api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={your api key}
//			*Find date with UNIX timestamp*
//Within 30 Day Forecast: https://pro.openweathermap.org/data/2.5/climate/month?id=2643743&appid={YOUR API KEY}
//
//GOOGLE MAPS INFO
//api key: AIzaSyBVFrBF21hllWQlXx4ipVC_c17v8BlMfZs
//geolocation url: https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=YOUR_API_KEY


//-----APP UI-----//
$(document).ready(function () {

	$(".js-intro").css("display", "block");

	setTimeout(welcomeFade, 1000);
	setTimeout(content, 3000);
});

function welcomeFade() {
	$(".js-intro").fadeOut(2000);
}

function content() {
	$(".nameOfApp").fadeIn(1000);
	$(".input-screen").fadeIn(1000);
}
//-----End APP UI-----//

//--------------Jerrad Work Zone--------------//
function getQueryParams(params) {
	const queryItems = Object.keys(params)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	return queryItems.join('&');
}


function getFourSqData(destination, destState) {
	const url = 'https://api.foursquare.com/v2/venues/search?client_id=G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM&client_secret=SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1&v=20200421&near=Ocean Shores, WA&categoryId=4d4b7104d754a06370d81259&limit=1';

	fetch(url)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson))
}


function getZamatoData(destination, destState) {
	const zamatoApiKey = '6d305f760284a82816236872c2cd5935';
	const url = 'https://developers.zomato.com/api/v2.1/collections?city_id=279&lat=47.6205&lon=122.3493&count=1';

	const options = {
		headers: new Headers({
			"user-key": zamatoApiKey
		})
	};

	fetch(url, options)
		.then(response => response.json())
		.then(responseJson => console.log(responseJson))

}

function watchForm() {
	$('#form').submit(event => {
		event.preventDefault();
		const destination = $('#destination').val();
		const destState = $('#js-dest-state').val();
		getZamatoData(destination, destState);
		getFourSqData(destination, destState);
	});
}

$(watchForm);
//-----End Jerrad Work Zone------//

