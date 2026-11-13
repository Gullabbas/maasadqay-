import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOrderId, isValidPakistaniPhone, buildWhatsAppOrderLink } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

// Zod schema for validating orders
const OrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      product: z.object({
        id: z.string(),
        sku: z.string(),
        name: z.string(),
        price: z.number(),
        images: z.array(z.string()),
      }),
      size: z.string().min(1, "Size is required"),
      color: z.string().default("Standard"),
      quantity: z.number().int().positive().default(1),
    })
  ).min(1, "At least one item is required in the order"),
  customer: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    phoneNumber: z.string().refine(isValidPakistaniPhone, {
      message: "Please enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03154245424)",
    }),
    city: z.string().min(2, "City is required"),
    address: z.string().min(5, "Complete street address is required"),
    email: z.string().email().optional().or(z.literal("")),
    paymentMethod: z.enum(["COD", "Card", "BankTransfer"]).default("COD"),
    orderNotes: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = OrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { items, customer } = validated.data;

    // Calculate subtotal in server code
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Free shipping above Rs. 10,000, else flat Rs. 250
    const shippingFee =
      subtotal >= SITE_CONFIG.shipping.freeThreshold ? 0 : SITE_CONFIG.shipping.flatRate;

    const total = subtotal + shippingFee;
    const orderId = generateOrderId();
    const createdAt = new Date().toISOString();

    const orderRecord = {
      id: orderId,
      items,
      customer,
      subtotal,
      shippingFee,
      total,
      paymentMethod: customer.paymentMethod,
      status: "confirmed" as const,
      createdAt,
      trackingUrl: SITE_CONFIG.orderTrackingUrl,
      whatsappUrl: buildWhatsAppOrderLink({
        id: orderId,
        customer,
        total,
        items,
      }),
    };

    // Return the confirmed order
    return NextResponse.json(
      {
        success: true,
        order: orderRecord,
        message: "Order placed successfully! We will contact you via WhatsApp for dispatch confirmation.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error while processing your order. Please retry or contact 0315-4245424 on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
