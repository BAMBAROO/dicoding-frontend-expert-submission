import database from '../utils/indexeddb';

class ButtonFavorite extends HTMLElement {
  set button(buttonClass) {
    if (buttonClass === 'add') {
      this.buttonAdd();
    } else if (buttonClass === 'delete') {
      this.buttonDelete();
    }
  }

  set data(data) {
    this.dataRestaurant = data;
  }

  buttonAdd() {
    this.innerHTML = '<button class="button-2" id="favorite-add">Add Favorite</button>';
    this.querySelector('#favorite-add')?.addEventListener('click', () => {
      const objectDataRestaurant = {
        id: this.dataRestaurant.id,
        name: this.dataRestaurant.name,
        description: this.dataRestaurant.description,
        pictureId: this.dataRestaurant.pictureId,
        city: this.dataRestaurant.city,
        rating: this.dataRestaurant.rating,
      };
      database
        .putMovie(objectDataRestaurant)
        .then(async () => {
          this.buttonDelete();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  buttonDelete() {
    this.innerHTML = '<button class="button-2" id="favorite-delete">Delete Favorite</button>';
    this.querySelector('#favorite-delete')?.addEventListener('click', () => {
      database
        .deleteMovie(this.dataRestaurant.id)
        .then(async () => {
          this.buttonAdd();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

customElements.define('button-favorite', ButtonFavorite);
