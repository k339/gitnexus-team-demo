import { calculateDiscount } from '../pricing/calculateDiscount.js';
export function estimateRefund(order) {
  return order.subtotal - calculateDiscount(order.subtotal, order.tier);
}
