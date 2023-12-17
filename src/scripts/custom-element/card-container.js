import './card-item';
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const searchBar = ` 
      <div class="search-container">
          <input type="text" class="search-input" placeholder="Search Restaurant">
          <button class="search-button">Search</button>
      </div>`;

function jumbotron(type) {
  if (type === 'Home') {
    return `
      <div class="jumbotron">
      <picture>
          <source media="(min-width: 601px)" srcset="images/hero/hero-image_2-new.jpeg" type="image/jpeg">
          <source media="(max-width: 600px)" srcset="images/hero/hero-image_2-small-new.jpeg" type="image/jpeg">
          <img src="images/hero/hero-image_2-new.jpeg" alt="jumbotron-image">
        </picture>
        <div class="jumbotron-content">
            <h1>${type} Page</h1>
        </div>
    </div>
      ${searchBar}`;
  }
  return `
    <div class="jumbotron">
      <picture>
          <source media="(min-width: 601px)" srcset="images/hero/hero-image_2-new.jpeg" type="image/jpeg">
          <source media="(max-width: 600px)" srcset="images/hero/hero-image_2-small-new.jpeg" type="image/jpeg">
          <img src="images/hero/hero-image_2-new.jpeg" alt="jumbotron-image">
        </picture>
        <div class="jumbotron-content">
            <h1>Favorite Page</h1>
        </div>
    </div>`;
}

class CardContainer extends HTMLElement {
  set pageType(type) {
    this.type = type;
  }

  set container(datas) {
    this.datas = datas;
    this.render();
  }

  render() {
    const core = document.querySelector('#core');
    this.innerHTML = '';
    this.datas.forEach((data) => {
      const cardItem = document.createElement('card-item');
      cardItem.item = data;
      this.appendChild(cardItem);
    });
    this.setAttribute('class', 'card-container');
    this.setAttribute('id', 'maincontent');

    core.innerHTML = jumbotron(this.type);

    core.appendChild(this);

    const searchInput = core.querySelector('.search-input');

    core.querySelector('.search-button')?.addEventListener('click', () => {
      const data = searchInput?.value;
      fetch(`${CONFIG.API_SEARCH}${data}`)
        .then((response) => response.json())
        .then((result) => {
          this.container = result.restaurants;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

customElements.define('card-container', CardContainer);
