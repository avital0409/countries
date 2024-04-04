const getResponse = async (url) => {
  const response = await fetch(url)
  return await response.json();
}

const getAllCountries = async () => {
  return await getResponse("https://restcountries.com/v3.1/all");
}

const getCountriesByRegion = async (region) => {
  return await getResponse("https://restcountries.com/v3.1/region/" + region);
}

const getCountryByName = async (countryName) => {
  return await getResponse("https://restcountries.com/v3.1/name/" + countryName);
}