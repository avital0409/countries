let loader;
let countryDetails;
let country;

const updateCountryPage = () => {
  countryDetails.innerHTML = '';

};

document.addEventListener('DOMContentLoaded', () => {
  countryDetails = document.getElementsByClassName("country-details")[0];
  loader = document.getElementsByClassName("loader")[0];
  updateCountryPage();
});

const initApp = async () => {
  const params = new URLSearchParams(window.location.search);
  console.log(JSON.stringify(params));
  const countryName = params.get('countryName');
  country = (await getCountryByName(countryName))[0];


  //I chose to implement it this way, to make it more scalable in case I would like to add more fields in the future
  const countryData = {
    "Native Name": getNativeName(country.name.nativeName),
    "Population": numberWithCommas(country.population),
    "Region": country.region,
    "Sub Region": country.subregion,
    "Capital": country.capital,
    "Top Level Domain": country.tld,
    "Currencies": printableCurrencies(country.currencies),
    "La nguages": printableLanguages(country.languages),
  };

  const generateFlag = () => {
    const divCountryFlag = document.createElement("div");
    const img = document.createElement("img");
    divCountryFlag.className = "country-flag";
    img.src = country.flags.svg;
    img.alt = country.flags.alt;
    divCountryFlag.appendChild(img);
    return divCountryFlag;
  }

  const generatefield = (field) => {
    const fieldElement = document.createElement("div");
    const fieldName = document.createElement("strong");
    fieldName.appendChild(document.createTextNode(field + ": "));
    fieldElement.appendChild(fieldName);
    fieldElement.appendChild(document.createTextNode(countryData[field]));
    fieldElement.style.marginBottom = "10px";
    return fieldElement;
  }

  const generateInfo = () => {
    const infoCol = document.createElement("div");
    infoCol.className = "country-info";
    const h1 = document.createElement("h1");
    infoCol.appendChild(h1);
    h1.appendChild(document.createTextNode(country.name.common));

    const infoFields = document.createElement("div");

    Object.keys(countryData).forEach(key => {
      infoFields.appendChild(generatefield(key));
    });

    infoCol.appendChild(infoFields);
    return infoCol;
  }

  const content = document.createElement("div");
  content.style.display = 'flex';
  content.style.flexDirection = 'row';
  countryDetails.appendChild(content);
  content.appendChild(generateFlag());
  content.appendChild(generateInfo());
  hideLoader();
}

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const printableCurrencies = (currencies) => {
  let result = '';
  let commasLeft = Object.keys(currencies).length - 1;
  for (const item of Object.values(currencies)) {
    result += item.name;
    if (commasLeft > 0) {
      result += ', ';
      commasLeft--;
    }
  }
  return result;
}

const printableLanguages = (languages) => {
  let result = '';
  let commasLeft = Object.keys(languages).length - 1;
  for (const item of Object.values(languages)) {
    result += item;
    if (commasLeft > 0) {
      result += ', ';
      commasLeft--;
    }
  }
  return result;
}

const getNativeName = (nativeNames) => {
  const keys = Object.keys(nativeNames);
  const lastKey = keys[keys.length - 1];
  return nativeNames[lastKey].common;
}

const hideLoader = () => {
  loader.style.visibility = "hidden";
  loader.style.opacity = 0;
}


initApp();