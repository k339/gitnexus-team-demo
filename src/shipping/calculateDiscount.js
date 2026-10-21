// Shipping has its own independent policy.
export function calculateDiscount(shippingCost) {
  return shippingCost >= 100 ? 10 : 0;
}
