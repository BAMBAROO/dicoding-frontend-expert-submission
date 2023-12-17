export default function urlParser() {
  if (window.location.hash === '' || window.location.hash === '#/') {
    return window.location.pathname;
  }
  const location = window.location.hash.split('/');
  const url = location[1];
  return url;
}
