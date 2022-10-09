import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetch-countries.js';
import { listItemTemplate } from './templates/list-item-template';
import { cardTemplate } from './templates/card-template';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const inputValue = e.target.value.trim();
  removeChildren(refs.countryList);
  removeChildren(refs.countryInfo);
  if (inputValue === '') {
    return;
  }
  const data = fetchCountries(inputValue);
  data
    .then(res => {
      if (res.length > 10) {
        Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        return;
      }
      if (res.length === 1) {
        renderCard(res[0]);
        return;
      }
      renderList(res);
    })
    .catch(() => {
      Notify.failure(`Oops, there is no country with that name`);
    });
}

function renderList(countries) {
  refs.countryList.innerHTML = countries
    .map(({ name, svg }) => listItemTemplate({ name, svg }))
    .join('');
}

function renderCard(country) {
  const { name, capital, population, svg, languages } = country;
  refs.countryInfo.innerHTML = cardTemplate({
    name,
    capital,
    population,
    svg,
    languages,
  });
}

function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
