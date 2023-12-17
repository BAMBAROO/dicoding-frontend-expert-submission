import '../custom-element/card-container';
import database from '../utils/indexeddb';

export default async function favorite() {
  database
    .getAllMovies()
    .then((records) => {
      const container = document.createElement('card-container');
      container.pageType = 'Favorites';
      container.container = records;
    })
    .catch((err) => {
      console.log(err);
    });
}
