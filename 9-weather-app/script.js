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
