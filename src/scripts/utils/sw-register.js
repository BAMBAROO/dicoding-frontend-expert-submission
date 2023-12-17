// eslint-disable-next-line consistent-return
export default function swRegister() {
  if (!('serviceWorker' in navigator)) {
    return console.log('ServiceWorker not Supported!');
  }
  navigator.serviceWorker.register('./sw.bundle.js')
    .then(() => {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'reload') {
          if (!localStorage.getItem('reloadRequested')) {
            localStorage.setItem('reloadRequested', 'true');
            window.location.reload();
          } else {
            localStorage.clear();
          }
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
