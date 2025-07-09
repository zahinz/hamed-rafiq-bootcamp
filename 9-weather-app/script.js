console.log("Weather App Script Loaded");

const weatherForm = document.querySelector("#weatherForm");
const cityText = document.querySelector("#cityText");

weatherForm.addEventListener("submit", function (event) {
  // by default, the form will try to submit and refresh the page, and we don't want that
  // preventDefault() will stop the form from refreshing the page
  event.preventDefault();

  // inspect the event object
  // console.log(event.srcElement[0].value);

  // get form data, best way to get form data is to use FormData
  // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values
  const formData = new FormData(event.target);
  const city = formData.get("city");
  console.log("City:", city);
  cityText.textContent = `Weather for ${city}`;

  console.log("Form submitted");
});

// assignment
// create a BMI calculator form
// the form should have two inputs: weight and height
// when the form is submitted, calculate the BMI and display it in a div with id "bmiResult"
// the formula for BMI is weight (kg) / (height (m) * height (m))

// advanced assignment
// classify the BMI result into categories:
// Underweight: BMI < 18.5
// Normal weight: 18.5 <= BMI < 24.9
// Overweight: 25 <= BMI < 29.9
// Obesity: BMI >= 30
