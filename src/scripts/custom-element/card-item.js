import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import urlParser from '../utils/url-parser';
import CONFIG from '../../globals/config';

class CardItem extends HTMLElement {
  set item(item) {
    this.data = item;
    this.url = urlParser();
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card"> 
        <picture>
          <source media="(min-width: 601px)" data-srcset="${CONFIG.MediumImage}${this.data.pictureId}" type="image/jpeg" >
          <source media="(max-width: 600px)" data-srcset="${CONFIG.SmallImage}${this.data.pictureId}" type="image/jpeg">
          <img class="lazyload" data-src="images/small/${this.data.pictureId}.webp" alt="${this.data.name}" width="auto" height="auto">
        </picture>
          <div class="card-content">
            <h1 id="restaurant-title">${this.data.name}</h1>
            <h2>rating : ${this.data.rating}</h2>
            <h2>khas kota : ${this.data.city}</h2>
            <p>${this.data.description}</p>
            <a href="/#/detail/${this.data.id}" class="detail-href">
                <button class="button-2">Detail</button>
            </a>
            <br>
          </div>
        </div>
    `;
  }
}

customElements.define('card-item', CardItem);
