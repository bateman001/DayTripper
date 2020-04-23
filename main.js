//JavaScript Document
//
//WEATHER API INFO
//3 weather options: current, 10 day forecast, 30 day 
//Same Day Forecast url: api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
//
//MAP QUEST INFO
//GEOCODE: http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=${CITY},${STATE}
//MAP w/ ROOUTE: https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&size=600,400@2x&key=${mapQuestKey}


//---Code Start---//


//global variables and constants
const weatherKey = 'c13d4b80ab21751c22f9351b411259d7';
const mapQuestKey = 'nz5VddD23ce9UIWdEbxB4pe2tM6YEyOD';
const zomatoApiKey = '6d305f760284a82816236872c2cd5935';
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
		
	$(".input-screen").css("display", "none");
	$(".input-itinerary").css("display", "block");
	
}
//-----End APP UI-----//



//---Fetch Requests---//
function getOrigin(city, state){ //function fetches start city, state pair and passes object to a lat and lng function
	
	const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	
	
	fetch(url)
		.then(response => response.json())
		.then(responseJson => originLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
	
}
	
function getDestination(city, state){ //function fetches destintion city and state pair and passes object to a lat and lng function
	
	const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	

	return fetch(url)
		.then(response => response.json())
		.then(responseJson => destinationLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
}

function originLatandLng(responseJson){
	
	origin = [];
	origin.push(responseJson.results[0].locations[0].latLng.lat);
	origin.push(responseJson.results[0].locations[0].latLng.lng);
	
	console.log(origin);
		
}

function destinationLatandLng(responseJson){
	
	destination = [];
	destination.push(responseJson.results[0].locations[0].latLng.lat);
	destination.push(responseJson.results[0].locations[0].latLng.lng);
		
	console.log(destination);
	
}

function getZomatoLocationData(city, destination) {
	const url = `https://developers.zomato.com/api/v2.1/locations?query=${city}&lat=${destination[0]}&lon=${destination[1]}&count=1`
	const options = {
		headers: new Headers({
			"user-key": zomatoApiKey
		})
	};

	fetch(url, options)
		.then(response => response.json())
		.then(responseJson => {
			getZomatoCollectionData(responseJson.location_suggestions[0].entity_id, destination)
		})
}

function getZomatoCollectionData(cityId, destination) {
	const url = `https://developers.zomato.com/api/v2.1/collections?city_id=${cityId}&lat=${destination[0]}&${destination[1]}&count=1`;

	const options = {
		headers: new Headers({
			"user-key": zomatoApiKey
		})
	};

	fetch(url, options)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson))

}

function getFourSqData(city, state) {
	const fourSqClientId = 'G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM';
	const fourSqClientSecret = 'SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1';

	const url = `https://api.foursquare.com/v2/venues/search?client_id=${fourSqClientId}&client_secret=${fourSqClientSecret}&v=20200421&near=${city},${state}&categoryId=4d4b7104d754a06370d81259&limit=1`;

	fetch(url)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson))
}
//---End Fetch Requests---//

function watchForm(){
	$("form").submit(e => {
	
		e.preventDefault();
		
		let startCity = $("#startCity").val();
		let startState = $("#js-search1").find(":selected").val();
		
		let destinationCity = $("#destinationCity").val();
		let destinationState = $("#js-search2").find(":selected").val();
		
		getOrigin(startCity, startState);	
				
		getDestination(destinationCity, destinationState)
		.then(data => {
			displayItineraryInput();
			getFourSqData(destinationCity, destinationState);
			getZomatoLocationData(destinationCity, destination);
			getSameDayWeather(destination);
			getMap(origin, destination);
			getDirections(origin, destination);

		});
	});
	
}
$(watchForm);

function getMap(origin, destination){
	
	
	let url = `https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&size=600,400@2x&key=${mapQuestKey}`;
	
	console.log(origin[0]);
	console.log(destination);
	
	$(".route").append(`<img src="${url}" alt="map" width="300" height="200">`);
	
}

function getDirections(origin, destination){
	
	let url = `http://www.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${origin[0]},${origin[1]}&to=${destination[0]},${destination[1]}`;
	
	console.log(origin[0]);
	console.log(destination);
	fetch(url)
		.then(response => response.json())
		.then(responseJson => console.log(responseJson))
		.catch(err => alert("someting went wrong"));
}

function getSameDayWeather(destination){
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destination[0]}&lon=${destination[1]}&units=imperial&appid=${weatherKey}`;
		
	fetch(url)
		.then(response => response.json())
		.then(responseJson => displayWeather(responseJson))
		.catch(err => alert("something is wrong"));
}

function displayWeather(responseJson){
	
	$(".weather").append(`<h1>Weather</h1> <p>High of ${responseJson.daily[0].temp.max} <br> Low of ${responseJson.daily[0].temp.min}.<br> Expect: ${responseJson.daily[0].weather[0].description}.`);
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
