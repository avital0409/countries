let countriesGrid;
let countriesData;
let filterWrapper;
let filterDropdown;
let searchInput;
let regex = new RegExp();

const updateCountriesGrid = () => {
  countryDetails.innerHTML = '';
  countriesData.map(country => {
    const countryName = country.name.common;
    if (regex.test(countryName)) {
      const countryBox = generateCountryBox(country);
      countryDetails.appendChild(countryBox);
      countryBox.addEventListener('click', async () => {
        window.location.href = `details.html?countryName=${country.name.common}`;
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const hideFilterBody = () => {
    filterDropdown.style.visibility = "hidden";
    filterDropdown.style.opacity = 0;
  };

  const showFilterBody = () => {
    filterDropdown.style.visibility = "visible";
    filterDropdown.style.opacity = 1;
  };

  countryDetails = document.getElementsByClassName("countries-grid")[0];
  filterWrapper = document.getElementsByClassName('dropdown-wrapper')[0];
  filterDropdown = document.getElementsByClassName('dropdown-body')[0];
  searchInput = document.getElementsByClassName('search-input')[0];
  hideFilterBody();

  filterWrapper.addEventListener('click', (event) => {
    showFilterBody();
  });

  filterDropdown.addEventListener('click', async (event) => {
    if (event.target.tagName === 'LI') {
      const region = event.target.getAttribute('data-region');
      countriesData = await getCountriesByRegion(region);
      updateCountriesGrid();
    }
    hideFilterBody();
  });

  searchInput.addEventListener('input', (event) => {
    regex = new RegExp(`${event.target.value}`, 'i');
    updateCountriesGrid();
  });
});



const initApp = async () => {
  countriesData = await getAllCountries();
  updateCountriesGrid();
}

const generateCountryBox = (country) => {
  const generateTitle = () => {
    const h2 = document.createElement("h2");
    h2.className = "country-title";
    h2.appendChild(document.createTextNode(country.name.official));
    return h2;
  }

  const generateFlag = () => {
    const divCountryFlag = document.createElement("div");
    const img = document.createElement("img");
    divCountryFlag.className = "country-flag";
    img.src = country.flags.svg;
    img.alt = country.flags.alt;
    divCountryFlag.appendChild(img);
    return divCountryFlag;
  }

  const generateBrief = () => {
    const numberWithCommas = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //I chose to implement it this way, to make it more scalable in case I would like to add more fields in the future
    const briefItems = {
      "Population": numberWithCommas(country.population),
      "Region": country.region,
      "Capital": country.capital
    };

    const generateBriefItem = (itemTitle) => {
      const briefItem = document.createElement("li");
      const briefItemTitle = document.createElement("strong");
      briefItemTitle.appendChild(document.createTextNode(itemTitle + ": "));
      briefItem.appendChild(briefItemTitle);
      briefItem.appendChild(document.createTextNode(briefItems[itemTitle]));
      return briefItem;
    }

    const ul = document.createElement("ul");
    ul.className = "country-brief";

    Object.keys(briefItems).forEach(key => {
      ul.appendChild(generateBriefItem(key));
    });

    return ul;
  }

  const generateInfo = () => {
    const divCountryInfo = document.createElement("div");
    divCountryInfo.className = "country-info";
    divCountryInfo.appendChild(generateTitle());
    divCountryInfo.appendChild(generateBrief());
    return divCountryInfo;
  }

  const a = document.createElement("a");
  a.href = "#";
  a.className = "country scale-effect";
  a.setAttribute('data-country-name', country.name.official);
  a.appendChild(generateFlag());
  a.appendChild(generateInfo());
  return a;
}

initApp();