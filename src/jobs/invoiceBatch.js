import { createInvoice } from '../billing/createInvoice.js';
export function invoiceBatch(orders) {
  return orders.map(order => createInvoice(order));
}
