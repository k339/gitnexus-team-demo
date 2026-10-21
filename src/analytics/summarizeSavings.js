import { calculateDiscount } from '../pricing/calculateDiscount.js';
export function summarizeSavings(orders) {
  return orders.reduce((total, order) => total + calculateDiscount(order.subtotal, order.tier), 0);
}
