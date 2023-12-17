import 'regenerator-runtime';
import '../styles/main.css';
import './custom-element/card-container';
import swRegister from './utils/sw-register';
import renderPage from './utils/app';

window.addEventListener('hashchange', async () => {
  try {
    await renderPage();
  } finally {
    window.scrollTo(0, 0);
  }
});

window.addEventListener('load', async () => {
  await swRegister();
  await renderPage();
});

const menuToggle = document.querySelector('.menu-toggle button');
const nav = document.querySelector('nav .navbar');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('slide');
});
