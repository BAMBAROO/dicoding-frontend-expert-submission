import CONFIG from '../../globals/config';

const cacheHelper = {
  async cacheOpen(name) {
    const cache = await caches.open(name);
    return cache;
  },

  async deleteCache() {
    const cachesName = await caches.keys();
    cachesName
      .filter((cache) => cache !== CONFIG.CACHE_NAME)
      // eslint-disable-next-line array-callback-return
      .map((result) => { caches.delete(result); });
  },
};

export default cacheHelper;
