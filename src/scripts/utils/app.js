import urlParser from './url-parser';
import routes from '../routes/routes';

async function renderPage() {
  let url = await urlParser();
  if (url === '/index.html') {
    url = '/';
  }
  const app = routes[url];
  await app();
}

export default renderPage;
