//JavaScript Document
//
//WEATHER API INFO
//3 weather options: current, 10 day forecast, 30 day 
//Same Day Forecast url: api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
//
//MAP QUEST INFO
//GEOCODE: http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=${CITY},${STATE}
//MAP w/ ROOUTE: https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&size=600,400@2x&key=${mapQuestKey}

const weatherKey = 'c13d4b80ab21751c22f9351b411259d7';
const mapQuestKey = 'nz5VddD23ce9UIWdEbxB4pe2tM6YEyOD';
const zamatoApiKey = '6d305f760284a82816236872c2cd5935';
const fourSqClientId = 'G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM';
const fourSqClientSecret = 'SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1';
let origin = []; //lat[0], lng[1]
let destination = []; //lat[0], lng[1]


//-----APP UI-----//
$(document).ready(function(){
	
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

function displayItineraryInput(){
		
	$(".input-screen").hide();
	$(".input-itinerary").show();
	
	
}
//-----End APP UI-----//

// function getQueryParams(params) {
// 	const queryItems = Object.keys(params)
// 		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
// 	return queryItems.join('&');
// }


function getFourSqData(destinationCity, destinationState) {
	const url = `https://api.foursquare.com/v2/venues/search?client_id=G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM&client_secret=SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1&v=20200421&near=${destinationCity},${destinationState}&categoryId=4d4b7104d754a06370d81259&limit=1`;

	fetch(url)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson))
}

function getZomatoData(destinationCity, destinationState) {
	const url = 'https://developers.zomato.com/api/v2.1/collections?city_id=279&lat=47.6205&lon=122.3493&count=1';
		
	const options = {
		headers: new Headers({
			"user-key": zamatoApiKey
		})
	};
	
	console.log(destinationCity, destinationState);
	console.log(options);

	fetch(url, options)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson));

}

function watchForm(){
	$("form").submit(e => {
	
		e.preventDefault();
		
		let startCity = $("#startCity").val();
		let startState = $("#js-search1").find(":selected").val();
		
		let destinationCity = $("#destinationCity").val();
		let destinationState = $("#js-search2").find(":selected").val();
		
		//let todaysDate = new Date();
		
		//let selectedDate = new Date($("#date").val());
		
		
		//console.log("today: " + todaysDate);
		//console.log("selected: " + selectedDate);
		//console.log("day: " + day);
		
		getOrigin(startCity, startState);	
		getDestination(destinationCity, destinationState);
		getFourSqData(destinationCity, destinationState);
		getZomatoData(destinationCity, destinationState);	
		
		displayItineraryInput();
	});
}

$(watchForm);

//FETCH REQUESTS
function getOrigin(city, state){ //function fetches start city, state pair and passes object to a lat and lng function
	
	const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	
	console.log(url);
	
	fetch(url)
		.then(response => response.json())
		.then(responseJson => originLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
	
}
	
function getDestination(city, state){ //function fetches destintion city and state pair and passes object to a lat and lng function
	
	const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	
	console.log(url);
	
	fetch(url)
		.then(response => response.json())
		.then(responseJson => destinationLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
}

function originLatandLng(responseJson){
		
	origin.push(responseJson.results[0].locations[0].latLng.lat);
	origin.push(responseJson.results[0].locations[0].latLng.lng);
	
	console.log(origin);
		
}

function destinationLatandLng(responseJson){
	
	destination.push(responseJson.results[0].locations[0].latLng.lat);
	destination.push(responseJson.results[0].locations[0].latLng.lng);
		
	console.log(destination);
	
	getSameDayWeather();

}

//function fetchMap(){
	
//	let url = `https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&size=600,400@2x&key=${mapQuestKey}`;
	
//	console.log(url);
	
//fetch(url)
	//	.then(response => response.json())
	//	.then(responseJson => console.log(responseJson))
	//	.catch(err => alert("something is wrong"));
	
//}

function getSameDayWeather(){
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destination[0]}&lon=${destination[1]}&units=imperial&appid=${weatherKey}`;
	 console.log(destination[0]);
	console.log(url);
	
	fetch(url)
		.then(response => response.json())
		.then(responseJson => displayWeather(responseJson))
		.catch(err => alert("something is wrong"));
}

function displayWeather(responseJson){
	console.log(responseJson);
	
	$(".weather").append(`<h1>Weather</h1> <p>High of ${responseJson.daily[0].temp.max} <br> Low of ${responseJson.daily[0].temp.min}.<br> You can expect ${responseJson.daily[0].weather[0].description}.`);
}
//	fetch(url).then(response => if(!response.ok){
//		throw new Error (response.message);
//	}else{
//		return response.json();
//	}).then(responseJson => displayWeather(responseJon)).catch(err => "something went wrong");
//}

//function get16DayWeather(lat, lon){
//	const url = ``;
//	
//	fetch(url).then(response => if(!response.ok){
///		throw new Error (response.message);
//	}else{
//		return response.json();
//	}).then(responseJson => displayWeather(responseJon)).catch(err => "something went wrong");
//	
//}
//
//function get30DayWeather(lat, lon){
//	const url = ``;
//	
//	fetch(url).then(response => if(!response.ok){
//		throw new Error (response.message);
//	}else{
//		return response.json();
//	}).then(responseJson => displayWeather(responseJon)).catch(err => "something went wrong");
//	
//}
