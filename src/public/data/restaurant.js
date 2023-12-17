import CONFIG from '../../globals/config';

export async function listDataRestaurant() {
  const response = await fetch(CONFIG.API_LIST);
  const result = await response.json();
  return result;
}

export async function detailRestaurant() {
  const id = window.location.hash.split('/')[2];
  const response = await fetch(CONFIG.API_DETAIL + id);
  const result = await response.json();
  return result;
}
