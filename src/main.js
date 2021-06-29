import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'; //imports WeatherService object which makes an API call from Open Weather API to request specific weather data
// import template from './template.js';

function clearFields() { //Create function to empty input fields  
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}


$(document).ready(function () {
  $('#weatherLocation').click(function () {
    let city = $('#location').val(); //Save input in city value
    clearFields(); //Calling function to empty input fields 

    let promise = WeatherService.getWeather(city); //References WeatherService object in imported function

    promise.then(function (response) { //.then is one of three methods of the XHR object --> it handles both a results response and a rejected response
      const body = JSON.parse(response); //If we get a response then we parse the response --> meaning turning the string into an object
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`); //shows city(var where the location is saved from user input), body.main.humidity --> pulling the data from the parsed response
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`); //If there we don't get a response then it displays the error message
    });
  });
});