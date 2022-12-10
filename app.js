const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const cityDetails = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const errorClass = document.querySelector(".err");
const cityInput = document.getElementById("city");
const locationBtn = document.getElementById("button-addon1");

const updateUI = (data) => {
  //destructure properties
  const { cityDetail, weather } = data;

  console.log(data);

  //update details template
  cityDetails.innerHTML = `
	<h5 id="cityName" class="my-3">${cityDetail.EnglishName}</h5>
	<div class="my-3">${weather.WeatherText}</div>
	<div class="display-4 my-4">
		<span>${weather.Temperature.Metric.Value}</span>
		<span>°C</span>
	</div>
	
  `;

  //update the images & icons
  let iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSource);
  icon.setAttribute("src", iconSource);
  //remove the d-npne class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async (city) => {
  const cityDetail = await getCity(city);
  const weather = await getWeather(cityDetail.Key);

  return {
    cityDetail,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  errorClass.innerHTML = "";
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch(
      (err) =>
        (errorClass.innerHTML = `Something is wrong.  <span class="material-symbols-outlined"> emoji_objects </span>`)
    );
});

//get location
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  }
});

const onError = (err) => {
  console.log(err);
};
const onSucces = async (position) => {
  let ltd = position.coords.latitude;
  let lng = position.coords.longitude;

  const location_apiKey = "c09b0c3195424ea0a08c40c488e3c86a";
  const location_url = `https://api.opencagedata.com/geocode/v1/json?q=${ltd}+${lng}&key=${location_apiKey}`;
  const response = await fetch(location_url);
  const data = await response.json();
  const city = data.results[0].components.province;
  cityInput.value = city;
  updateCity(city).then((data) => updateUI(data));
};
