import { estimateRefund } from '../refunds/estimateRefund.js';
export function refundPreview(order) {
  return { refundable: estimateRefund(order) };
}
