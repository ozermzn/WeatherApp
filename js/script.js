const api_key = "jh0RhesXEVsEGSyNc6nLX5AyA0AsBfn4";

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${api_key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  console.log(data[0]);
  return data[0];
};

const getWeather = async (cityKey) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${cityKey}?apikey=${api_key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
