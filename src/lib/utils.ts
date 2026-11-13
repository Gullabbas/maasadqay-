import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `Rs. ${new Intl.NumberFormat("en-PK").format(amount)}`;
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Validates Pakistani mobile phone numbers:
 * Acceptable formats: 03001234567, 0300-1234567, +923001234567, +92 300 1234567, 03154245424
 */
export function isValidPakistaniPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  // Matches 03XXXXXXXXX (11 digits) or 923XXXXXXXXX (12 digits) or +923XXXXXXXXX
  const regex = /^(?:(?:\+92|92)|0)?(3[0-9]{9})$/;
  return regex.test(cleaned);
}

export function formatPakistaniPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  if (cleaned.startsWith("92")) {
    const local = "0" + cleaned.slice(2);
    return local.replace(/^(\d{4})(\d{7})$/, "$1-$2");
  }
  return cleaned.replace(/^(\d{4})(\d{7})$/, "$1-$2");
}

/**
 * Generates an Order ID in the exact format: MS-YYMMDD-XXXX
 */
export function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MS-${yy}${mm}${dd}-${randomChars}`;
}

export function buildWhatsAppOrderLink(order: {
  id: string;
  customer: { fullName: string; phoneNumber: string; city: string; address: string };
  total: number;
  items: { product: { name: string; sku: string }; size: string; quantity: number }[];
}): string {
  const itemsText = order.items
    .map((item, idx) => `${idx + 1}. ${item.product.name} (${item.product.sku}) - Size: ${item.size} x ${item.quantity}`)
    .join("\n");

  const message = `Assalam o Alaikum Maa Sadqay Team!
I have placed an order on your website.

*Order ID:* ${order.id}
*Name:* ${order.customer.fullName}
*Phone:* ${order.customer.phoneNumber}
*Address:* ${order.customer.address}, ${order.customer.city}
*Total Amount:* Rs. ${new Intl.NumberFormat("en-PK").format(order.total)} (Cash on Delivery)

*Items Ordered:*
${itemsText}

Please confirm my order dispatch. Thank you!`;

  return `https://wa.me/923154245424?text=${encodeURIComponent(message)}`;
}
