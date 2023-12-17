import { listDataRestaurant } from '../../public/data/restaurant';
import '../custom-element/card-container';

export default async function home() {
  const container = document.createElement('card-container');
  const data = await listDataRestaurant();
  container.pageType = 'Home';
  container.container = data.restaurants;
}
