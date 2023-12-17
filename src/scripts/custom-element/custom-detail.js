/* eslint-disable array-callback-return */
import CONFIG from '../../globals/config';
import './button-favorite';
import database from '../utils/indexeddb';

function jumbotron() {
  return `
    <div class="jumbotron">
      <picture>
        <source media="(min-width: 601px)" data-srcset="images/hero/hero-image_2-new.jpeg" type="image/jpeg">
        <source media="(max-width: 600px)" data-srcset="images/hero/hero-image_2-small-new.jpeg" type="image/jpeg">
        <img src="images/hero/hero-image_2-new.jpeg" alt="jumbotron-image">
      </picture>
      <div class="jumbotron-content">
          <h1>Detail Page</h1>
      </div>
    </div>`;
}

class DetailPage extends HTMLElement {
  set container(datas) {
    this.dataRestaurant = datas.restaurant;
    this.customerReviews = datas.restaurant.customerReviews;
    database
      .getMovie(this.dataRestaurant.id)
      .then((record) => {
        if (record === undefined) {
          this.buttonCode = 'add';
        } else {
          this.buttonCode = 'delete';
        }
      })
      .finally(() => {
        this.render();
      });
  }

  render() {
    let listMakanan = '';
    let listMinuman = '';
    let listReview = '';
    let kategori = '';
    const { customerReviews } = this;
    this.dataRestaurant.categories.map((data) => {
      kategori += ` ${data.name}`;
    });
    customerReviews.map((data) => {
      listReview += `
        <div class="review">
            <p><b>Name:</b> ${data.name}</p>
            <p><b>Review:</b> ${data.review}.</p>
            <p><b>Date:</b> ${data.date}</p>
        </div>`;
    });
    this.dataRestaurant.menus.foods.map((data) => {
      listMakanan += `<li class="menu-item" tabindex="0">${data.name}</li>`;
    });
    this.dataRestaurant.menus.drinks.map((data) => {
      listMinuman += `<li class="menu-item" tabindex="0">${data.name}</li>`;
    });
    this.setAttribute('id', 'maincontent');
    const buttonTesting = document.createElement('button-favorite');
    buttonTesting.button = this.buttonCode;
    buttonTesting.data = this.dataRestaurant;
    this.innerHTML = `
      <div class="container2">
      <picture>
          <source media="(min-width: 601px)" srcset="${CONFIG.LargeImage}${this.dataRestaurant.pictureId}">
          <source media="(max-width: 600px)" srcset="${CONFIG.MediumImage}${this.dataRestaurant.pictureId}">
          <img class="restaurant-image" src="./images/large/${this.dataRestaurant.pictureId}-large.jpeg" alt="${this.dataRestaurant.name}" width="1280" height="720">
        </picture>

        <h1 class="information-restaurant" tabindex="0">Informasi Restoran</h1>
        <p class="p-resta"><b>Nama Restaurant    :</b> ${this.dataRestaurant.name}</p>
        <p class="p-resta"><b>Rating             :</b> ${this.dataRestaurant.rating}</p>
        <p class="p-resta"><b>Deskripsi Restoran :</b> ${this.dataRestaurant.description}</p>
        <p class="p-resta"><b>Alamat             :</b> ${this.dataRestaurant.address}</p>
        <p class="p-resta"><b>Kota               :</b> ${this.dataRestaurant.city}</p>
        <p class="p-resta"><b>Kategori           :</b> ${kategori}</p>

        <div class="menu-category">
            <h1>Menu</h1>
            <h3>Makanan</h3>
            <ul id="makanan">
            ${listMakanan}
            </ul>
            <h3 tabindex="0">Minuman</h3>
            <ul id="minuman">
            ${listMinuman}
            </ul>
        </div>

        <h2>Ulasan</h2>
        ${listReview}
        
        <h2>Tambahkan Ulasan</h2>
        <form class="form-submit">
            <label for="nama">Nama:</label>
            <input type="text" id="nama" class="input-nama" required>
            <br>
            <label for="ulasan">Ulasan:</label>
            <textarea id="ulasan" class="ulasan" " rows="4" required></textarea>
            <br>
            <input type="submit">
        </form>
      </div>
    `;
    this.appendChild(buttonTesting);
    const informationRestaurant = this.querySelector('.information-restaurant');
    const theButton = this.querySelector('button-favorite');
    informationRestaurant.insertAdjacentElement('beforebegin', theButton);
    const core = document.querySelector('#core');
    core.innerHTML = jumbotron();
    core.appendChild(this);

    // Form review
    const form = this.querySelector('.form-submit');
    const inputNama = this.querySelector('.input-nama');
    const inputUlasan = this.querySelector('.ulasan');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        id: this.dataRestaurant.id,
        name: inputNama.value,
        review: inputUlasan.value,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(CONFIG.API_REVIEW, options)
        .then((response) => response.json())
        .then(async (response) => {
          this.customerReviews = response.customerReviews;
          this.render();
        })
        .catch(() => {
          alert('Failed Add Review');
        });
    });
  }
}

customElements.define('detail-page', DetailPage);
