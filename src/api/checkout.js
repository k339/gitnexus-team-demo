import { buildQuote } from '../checkout/buildQuote.js';
export function checkout(request) {
  return { status: 200, body: buildQuote(request.subtotal, request.tier) };
}
