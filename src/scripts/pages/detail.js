import { detailRestaurant } from '../../public/data/restaurant';
import '../custom-element/custom-detail';

export default async function detail() {
  const page = document.createElement('detail-page');
  page.container = await detailRestaurant();
}
