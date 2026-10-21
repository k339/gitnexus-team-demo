import { calculateDiscount } from '../pricing/calculateDiscount.js';
export function buildQuote(subtotal, tier) {
  const discount = calculateDiscount(subtotal, tier);
  return { subtotal, discount, total: subtotal - discount };
}
