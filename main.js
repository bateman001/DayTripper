//JavaScript Document
//
//WEATHER API INFO
//3 weather options: current, 10 day forecast, 30 day 
//Same Day Forecast url: api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
//
//MAP QUEST INFO
//GEOCODE: http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=${CITY},${STATE}
//MAP w/ ROOUTE: https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&key=${mapQuestKey}


//---Code Start---//


//global variables and constants
const weatherKey = 'c13d4b80ab21751c22f9351b411259d7';
const mapQuestKey = 'nz5VddD23ce9UIWdEbxB4pe2tM6YEyOD';
const zomatoApiKey = '6d305f760284a82816236872c2cd5935';
let origin = []; //lat[0], lng[1]
let destination = [] //lat[0], lng[1]


//-----APP UI-----//
$(document).ready(function(){
	$(".js-intro").css("display", "block");

	setTimeout(welcomeFade, 1000);
	setTimeout(content, 4000);
});

function welcomeFade() {
	$(".js-intro").fadeOut(2000);
}

function content() {
	$(".nameOfApp").fadeIn(1000);
	$(".input-screen").show("blind", {direction: "up"}, 2000);
}

function displayItineraryInput(startCity, destinationCity){
		
	console.log("cities" + startCity + destinationCity);
	$(".input-screen").css("display", "none");
	$("#origin").html(startCity);
	$("#destination").html(destinationCity);
	$(".input-itenerary").css("display", "flex");
}
//-----End APP UI-----//



function watchForm(){
	$("form").submit(e => {
	
		e.preventDefault();
		
		let startCity = $("#startCity").val();
		let startState = $("#js-search1").find(":selected").val();
		
		let destinationCity = $("#destinationCity").val();
		let destinationState = $("#js-search2").find(":selected").val();
		
		Promise.all([getOrigin(startCity, startState), getDestination(destinationCity, destinationState)])
			.then(data => {

			displayItineraryInput(startCity, destinationCity);
			getFourSqData(destinationCity, destinationState);
			getZomatoLocationData(destinationCity, destination);
			getSameDayWeather(destination);
			getDirections(origin, destination);
			getMap(origin, destination);

		});
	});
	
}
$(watchForm);

//---Fetch Requests---//
function getOrigin(city, state){ //function fetches start city, state pair and passes object to a lat and lng function
	
	const url = `https://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	
	console.log(url);
	return fetch(url)
		.then(response => response.json())
		.then(responseJson => originLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
	
}
	
function getDestination(city, state){ //function fetches destintion city and state pair and passes object to a lat and lng function
	
	const url = `https://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${city},${state}`;
	console.log(url);
	return fetch(url)
		.then(response => response.json())
		.then(responseJson => destinationLatandLng(responseJson))
		.catch(err => alert("Wrong address"));
}

function originLatandLng(responseJson){
	
	origin = [];
	origin.push(responseJson.results[0].locations[0].latLng.lat);
	origin.push(responseJson.results[0].locations[0].latLng.lng);
	
	console.log("origin: " + origin);
		
}

function destinationLatandLng(responseJson){
	
	destination = [];
	destination.push(responseJson.results[0].locations[0].latLng.lat);
	destination.push(responseJson.results[0].locations[0].latLng.lng);
		
	console.log("destination: " + destination);
	
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
	.then(responseJson => displayRestaurants(responseJson))

}


function getFourSqData(city, state) {
	const fourSqClientId = 'G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM';
	const fourSqClientSecret = 'SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1';

	const url = `https://api.foursquare.com/v2/venues/explore?v=20200421&client_id=${fourSqClientId}&client_secret=${fourSqClientSecret}&section=outdoors&near=${city}, ${state}&radius=2000&limit=10`;

	fetch(url)
	.then(response => response.json())
	.then(responseJson => displayActivities(responseJson))
}

function getDirections(origin, destination){
	
	let url = `https://www.mapquestapi.com/directions/v2/route?key=${mapQuestKey}&from=${origin[0]},${origin[1]}&to=${destination[0]},${destination[1]}`;
	console.log(url);
	fetch(url)
		.then(response => response.json())
		.then(responseJson => displayDirections(responseJson))
		.catch(err => alert("someting went wrong"));
}

function getSameDayWeather(destination){
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destination[0]}&lon=${destination[1]}&units=imperial&appid=${weatherKey}`;
		
	fetch(url)
		.then(response => response.json())
		.then(responseJson => displayWeather(responseJson))
		.catch(err => alert("something is wrong"));
}

//DISPLAY FUNCTIONS

function getMap(origin, destination){
	
	
	let url = `https://www.mapquestapi.com/staticmap/v5/map?start=${origin[0]},${origin[1]}&end=${destination[0]},${destination[1]}&key=${mapQuestKey}`;
	
	$(".route").append(`<img src="${url}" alt="map">`);
	
	$(".route").css("display", "block");
	
}

function displayDirections(responseJson){
	let realtime = responseJson.route.realTime;
	let miles = responseJson.route.distance;
	let roundedMiles = Math.round(miles);
	let time = Math.floor(realtime / 3600);
	console.log(time);
	$(".route .js-results").append("Trip: " + roundedMiles + "miles/" + time + "hours" )
}

function displayWeather(responseJson){
	
	$(".weather").append(`<h3>Weather</h3> <p>High of ${responseJson.daily[0].temp.max} <br> Low of ${responseJson.daily[0].temp.min}.<br> Expect: ${responseJson.daily[0].weather[0].description}.`);
	
	$(".weather .js-results").css("display", "inline");
}

function displayRestaurants(responseJson){
	console.log("restaurants: ", responseJson);
	
	$(".js-restaurants .js-results").append(`<a href="${responseJson.share_url}" target="_blank"><p>Restaurants</p></a>`);
	
}

function displayActivities(responseJson){
	const recommended = responseJson.response.groups.filter(g => g.name === 'recommended')[0].items.slice(0, 5);

	console.log(recommended);
	
	for(const r of recommended){
		$(".js-activities .js-results").append(`<p>${r.venue.name}</p>`);

	}
	//$(".activities").append(`<p>${responseJson.groups[0].items[0].venue.location.formattedAddress[1]}</p>`);
	//$(".activities").append(`<p>${responseJson.groups[0].items[0].venue.location.formattedAddress[2]}</p>`);

}


$("#js-back").on("click", function(){
	$(".js-results").empty();
	$(".input-itenerary").hide();
	$(".input-screen").show();
});


