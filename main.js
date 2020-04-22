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