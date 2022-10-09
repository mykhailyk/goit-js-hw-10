export const listItemTemplate = ({ name, svg }) => {
  return `
    <li class="country-list__item">
      <img class="country-list__img" src="${svg}" alt="Country flag of ${name}" width="40"/>
      ${name}
    </li>
  `;
};
