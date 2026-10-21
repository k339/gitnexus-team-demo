import { memberSavings } from '../pricing/memberSavings.js';
export function buildOffer(subtotal, tier) {
  return `Save ${memberSavings(subtotal, tier).toFixed(2)}`;
}
