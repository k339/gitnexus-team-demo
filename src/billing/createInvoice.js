import { calculateDiscount as discountFor } from '../pricing/calculateDiscount.js';
export function createInvoice(order) {
  const deduction = discountFor(order.subtotal, order.tier);
  return { orderId: order.id, deduction, amountDue: order.subtotal - deduction };
}
