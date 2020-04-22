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


const zamatoApiKey = '6d305f760284a82816236872c2cd5935';
const fourSqClientId = 'G1NU4QN1WCJA5RJS5UVORD3TQGZQOUI1Y3DGWGRXNA5KI5CM'
const fourSqClientSecret = 'SN2D4HMIXTEGGP15EEMKRBI3GO4ORGFONTF4XEOJOVPHGZC1'



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
	
	let state = $("").val();
	let city = $("").val();
	
	validateAddress(city, state);
});

//FETCH REQUESTS
function validateAddress(city, state){
	
	const url = `https://maps.googleapis.com/maps/api/geocode/jsonaddress=${city},+${state}&key=AIzaSyBVFrBF21hllWQlXx4ipVC_c17v8BlMfZs`;
	
	fetch(url).then(response => {
		if(!response.ok){
			throw new Error (response.message)
		}else{
			return response.json();
		}
	}).then(responseJson => {
		console.log(responseJson);
	}).catch(err => alert("Wrong address"));
}
