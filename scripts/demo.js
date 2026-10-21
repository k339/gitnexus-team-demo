import { checkout } from '../src/api/checkout.js';
import { invoiceBatch } from '../src/jobs/invoiceBatch.js';
import { refundPreview } from '../src/support/refundPreview.js';
import { buildOffer } from '../src/marketing/buildOffer.js';
import { summarizeSavings } from '../src/analytics/summarizeSavings.js';
const order = { id: 'O-1', subtotal: 100, tier: 'gold' };
console.log(JSON.stringify({ checkout: checkout(order), invoices: invoiceBatch([order]), refund: refundPreview(order), offer: buildOffer(100, 'gold'), savings: summarizeSavings([order]) }, null, 2));
