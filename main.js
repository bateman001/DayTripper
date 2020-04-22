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
//directions: https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originCity},${originState}&destinations=${destinationCity},${destinationState}&key=YOUR_API_KEY

//MAP QUEST INFO
//GEOCODE: http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=${CITY},${STATE}


const mapQuestKey = 'nz5VddD23ce9UIWdEbxB4pe2tM6YEyOD';
const zamatoApiKey = '6d305f760284a82816236872c2cd5935';
const fourSqClientId = 'G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM';
const fourSqClientSecret = 'SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1';
let origin = []; //lat[0], lng[1]
let destination = []; //lat[0], lng[1]


//APP UI
$(document).ready(function(){
	
	$(".js-intro").css("display", "block");
	
	setTimeout(welcomeFade, 1000);
	setTimeout(content, 3000);
 });

function welcomeFade(){
	$(".js-intro").fadeOut(2000);
}

function content(){
	$(".nameOfApp").fadeIn(1000);
	$(".input-screen").fadeIn(1000); 
}


function getQueryParams(params){
	const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getZamatoData(searchTerm) {
	const query = getQueryParams();
	
}


$("form").submit(e => {
	
	e.preventDefault();
	
	let startCity = $("#startCity").val();
	let startState = $("#js-search1").find(":selected").val();
	
	let destinationCity = $("#destinationCity").val();
	let destinationState = $("#js-search2").find(":selected").val();
	
	getOrigin(startCity, startState);	
	getDestination(destinationCity, destinationState);		
	
});

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
	
	console.log("origin lat: ", responseJson.results[0].locations[0].latLng.lat);
	
	origin.push(responseJson.results[0].locations[0].latLng.lat);
	origin.push(responseJson.results[0].locations[0].latLng.lng);
	
	console.log(origin);
		
}

function destinationLatandLng(responseJson){
	
	console.log("destination lat: ", responseJson.results[0].locations[0].latLng.lat);

	destination.push(responseJson.results[0].locations[0].latLng.lat);
	destination.push(responseJson.results[0].locations[0].latLng.lng);
		
	console.log(destination);

}
//function getSameDayWeather(lat, lon){
	//const url = ``;
	
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