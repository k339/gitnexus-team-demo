import { calculateDiscount } from './calculateDiscount.js';
export function shippingQuote(cost) {
  return cost - calculateDiscount(cost);
}
