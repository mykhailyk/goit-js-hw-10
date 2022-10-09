const fieldList = ['name', 'capital', 'population', 'flags', 'languages'];
const searchParams = new URLSearchParams({
  fields: fieldList.join(','),
});
export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
    .then(r => r.json())
    .then(r =>
      r.map(it => ({
        name: it['name']['official'],
        capital: it['capital'],
        population: it['population'],
        svg: it['flags']['svg'],
        languages: it['languages'],
      }))
    );
};
