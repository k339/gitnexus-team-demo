export function calculateDiscount(subtotal, tier) {
  const rate = tier === 'gold' ? 0.2 : tier === 'silver' ? 0.1 : 0;
  return Math.round(subtotal * rate * 100) / 100;
}
