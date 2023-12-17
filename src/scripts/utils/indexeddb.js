import { openDB } from 'idb';
import CONFIG from '../../globals/config';

const dbPromise = openDB('favorites', 1, {
  upgrade(database) {
    database.createObjectStore(CONFIG.DB_STORE, { keyPath: 'id' });
  },
});

const database = {
  async getMovie(id) {
    return (await dbPromise).get(CONFIG.DB_STORE, id);
  },
  async getAllMovies() {
    return (await dbPromise).getAll(CONFIG.DB_STORE);
  },
  async putMovie(movie) {
    return (await dbPromise).put(CONFIG.DB_STORE, movie);
  },
  async deleteMovie(id) {
    return (await dbPromise).delete(CONFIG.DB_STORE, id);
  },
};

export default database;
