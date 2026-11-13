import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, productRepository } from "@/data/catalog";
import { isValidPakistaniPhone, generateOrderId, buildWhatsAppOrderLink, formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionState, liveCart, action } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const rawInput = (lastMessage?.content || "").trim();
    const text = rawInput.toLowerCase();

    // Current conversation state
    let state = sessionState || { step: "greeting", cart: [], customer: {} };

    // 1. Reset / Cancel
    if (
      text === "restart" ||
      text === "cancel" ||
      text === "cancel order" ||
      text === "start over" ||
      text === "start new order"
    ) {
      return NextResponse.json({
        reply: "Conversation reset! What would you like to explore today for your child?",
        chips: ["Boys Eastern Wear", "Toddler Range", "Kids Accessories", "Girls Collection", "Clearance Deals"],
        sessionState: { step: "greeting", cart: [], customer: {} },
      });
    }

    // 2. HIGHEST PRIORITY: Order Confirmation & Placement
    const isOrderConfirmation =
      action === "confirm_order" ||
      text === "confirm order (cash on delivery)" ||
      text === "confirm order" ||
      text === "confirm & place order (cash on delivery)" ||
      text === "confirm & place order" ||
      text === "place order" ||
      text === "place order now" ||
      text.startsWith("confirm order") ||
      (state.step === "reviewing_order" &&
        (text.includes("confirm") ||
          text.includes("yes") ||
          text.includes("haan") ||
          text.includes("place") ||
          text.includes("cod") ||
          text.includes("cash on delivery") ||
          text === "ok"));

    if (isOrderConfirmation) {
      // Determine cart items
      let cart =
        state.cart && state.cart.length > 0
          ? state.cart
          : liveCart && liveCart.length > 0
          ? liveCart.map((i: any) => ({
              id: i.id || `${i.product.id}-${i.size}`,
              product: i.product,
              size: i.size,
              quantity: i.quantity || 1,
            }))
          : [
              {
                id: "default-order",
                product: PRODUCTS[0],
                size: PRODUCTS[0].sizes[0] || "3-4Y",
                quantity: 1,
              },
            ];

      // Determine customer details
      const customer = {
        fullName: state.customer?.fullName || "Valued Parent",
        phoneNumber: state.customer?.phoneNumber || "0315-4245424",
        city: state.customer?.city || "Lahore",
        address: state.customer?.address || "Karim Block Market, Lahore",
        paymentMethod: "COD" as const,
      };

      const subtotal = cart.reduce(
        (sum: number, item: any) => sum + (item.product?.price || 1500) * (item.quantity || 1),
        0
      );
      const shippingFee = subtotal >= SITE_CONFIG.shipping.freeThreshold ? 0 : SITE_CONFIG.shipping.flatRate;
      const total = subtotal + shippingFee;
      const orderId = generateOrderId();

      const finalOrder = {
        id: orderId,
        items: cart,
        customer,
        subtotal,
        shippingFee,
        total,
        paymentMethod: "COD",
        trackingUrl: SITE_CONFIG.orderTrackingUrl,
        whatsappUrl: buildWhatsAppOrderLink({
          id: orderId,
          customer,
          total,
          items: cart,
        }),
      };

      return NextResponse.json({
        reply: `🎉 **Mubarak! Your order has been placed successfully via Cash on Delivery!**\n\n• **Order ID:** ${orderId}\n• **Total Payable:** ${formatPrice(total)} (Pay on Delivery)\n• **Delivery Courier:** TCS / Trax (3–5 Business Days)\n\nOur Lahore workshop is now hand-packing your parcel with love. You will receive an SMS and WhatsApp update when your package is handed to the rider.`,
        confirmedOrder: finalOrder,
        chips: ["Track My Order", "Talk on WhatsApp", "Start New Order"],
        sessionState: { step: "greeting", cart: [], customer: {} },
      });
    }

    // 3. Live Cart Checkout in Chat
    if (
      text.includes("checkout bag") ||
      text.includes("checkout my bag") ||
      text.includes("order my bag") ||
      text === "checkout bag items (cod)"
    ) {
      if (liveCart && liveCart.length > 0) {
        state.cart = liveCart.map((i: any) => ({
          id: i.id,
          product: i.product,
          size: i.size,
          quantity: i.quantity,
        }));
        return NextResponse.json({
          reply: `Great! I've loaded your ${state.cart.length} bag item(s). To arrange Cash on Delivery dispatch, please reply with your **Full Name**:`,
          sessionState: { ...state, step: "collecting_name" },
        });
      } else {
        return NextResponse.json({
          reply: "Your shopping bag is currently empty. Pick an outfit below to get started:",
          chips: ["Boys Eastern Wear", "Toddler Range", "Kids Accessories"],
          sessionState: state,
        });
      }
    }

    // 4. Intent: Order Tracking
    if (text.includes("track") || text.includes("kahan hai") || text.includes("status")) {
      return NextResponse.json({
        reply: `You can track your live parcel shipment anytime on our official courier portal:\n🔗 ${SITE_CONFIG.orderTrackingUrl}\n\nEnter your Order ID (format MS-YYMMDD-XXXX). Or message our team on WhatsApp: 0315-4245424.`,
        chips: ["Boys Wear", "Toddler Range", "Kids Accessories"],
        sessionState: state,
      });
    }

    // 5. Intent: Shipping / Delivery questions (strict matching so it NEVER intercepts checkout)
    const isShippingFaq =
      text === "shipping" ||
      text === "delivery" ||
      text.includes("shipping charges") ||
      text.includes("delivery charges") ||
      text.includes("kitne din") ||
      text.includes("delivery time") ||
      text.includes("delivery promises");

    if (isShippingFaq) {
      return NextResponse.json({
        reply: `📦 *Maa Sadqay Delivery Promises:*\n• Free Shipping nationwide on orders above Rs. 10,000!\n• Flat Rs. 250 shipping on all other orders nationwide.\n• Delivery takes 3–5 business days via courier (TCS/Trax).\n• Cash on Delivery (COD) available across Pakistan.`,
        chips: ["Boys Wear", "Toddler Range", "Accessories", "Start Order"],
        sessionState: state,
      });
    }

    // 6. Category Browsing Chips
    if (
      text.includes("boys wear") ||
      text.includes("boys") ||
      text.includes("eastern kurta") ||
      text.includes("eastern wear") ||
      text.includes("kurta") ||
      text === "boys"
    ) {
      const boysItems = PRODUCTS.filter((p) => p.category === "boys").slice(0, 4);
      return NextResponse.json({
        reply: `Here are our finest Boys Eastern & Co-ord outfits crafted in Lahore:`,
        products: boysItems,
        chips: boysItems.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    if (text.includes("toddler") || text === "toddler range" || text === "toddlers") {
      const toddlerItems = PRODUCTS.filter((p) => p.category === "toddlers").slice(0, 4);
      return NextResponse.json({
        reply: `Here are our most gentle organic cotton Toddler outfits (6-24 Months):`,
        products: toddlerItems,
        chips: toddlerItems.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    if (text.includes("accessories") || text === "kids accessories") {
      const accItems = PRODUCTS.filter((p) => p.category === "accessories").slice(0, 4);
      return NextResponse.json({
        reply: `Here are our top kids accessories (embroidered shawls, anti-slip socks, beanies, suspenders):`,
        products: accItems,
        chips: accItems.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    if (text.includes("girls") || text === "girls collection" || text === "girls co-ords") {
      const girlsItems = PRODUCTS.filter((p) => p.category === "girls").slice(0, 4);
      return NextResponse.json({
        reply: `Here are our delightful Girls co-ords and lawn pajama suits:`,
        products: girlsItems,
        chips: girlsItems.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    if (text.includes("sale") || text.includes("clearance") || text.includes("under 999") || text.includes("deals")) {
      const saleItems = PRODUCTS.filter((p) => p.isClearance || p.price <= 999).slice(0, 4);
      return NextResponse.json({
        reply: `Here are our hottest clearance deals priced under Rs. 999:`,
        products: saleItems,
        chips: saleItems.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    // 7. Handling Product Selection (e.g. "Pick BCSRC20" or user mentions SKU)
    const skuMatch = PRODUCTS.find(
      (p) =>
        text.includes(p.sku.toLowerCase()) ||
        text.replace(/pick\s+/g, "").trim() === p.sku.toLowerCase()
    );

    if (skuMatch) {
      return NextResponse.json({
        reply: `Excellent choice! *${skuMatch.name}* (${skuMatch.sku})\nPrice: *${formatPrice(skuMatch.price)}* (was ${formatPrice(skuMatch.originalPrice)})\n\nWhich age/size would you like for your child?`,
        products: [skuMatch],
        chips: skuMatch.sizes.map((s) => `Size ${s}`),
        sessionState: {
          ...state,
          step: "selecting_size",
          currentProduct: skuMatch,
        },
      });
    }

    // 8. Handling Size Selection (e.g. "Size 3-4Y" or "3-4y")
    if (state.step === "selecting_size" && state.currentProduct) {
      const matchedSize =
        state.currentProduct.sizes.find(
          (s: string) => text.includes(s.toLowerCase()) || text.replace(/size\s+/g, "").trim() === s.toLowerCase()
        ) || state.currentProduct.sizes[0];

      const item = {
        id: `${state.currentProduct.id}-${matchedSize}`,
        product: state.currentProduct,
        size: matchedSize,
        quantity: 1,
      };

      const newCart = [...(state.cart || []), item];

      return NextResponse.json({
        reply: `Wonderful! Added *${state.currentProduct.name}* (Size: *${matchedSize}*) to your order list.\n\nNow to prepare your parcel, please share your **Full Name**:`,
        sessionState: {
          ...state,
          step: "collecting_name",
          cart: newCart,
          currentProduct: null,
        },
      });
    }

    // 9. Handling Name Collection
    if (state.step === "collecting_name") {
      const name = rawInput.replace(/my name is/i, "").trim();
      return NextResponse.json({
        reply: `Shukriya, **${name}**! 📱 Please share your **Pakistani mobile number** (e.g. 0315-4245424) so our courier can contact you for delivery:`,
        sessionState: {
          ...state,
          step: "collecting_phone",
          customer: { ...(state.customer || {}), fullName: name },
        },
      });
    }

    // 10. Handling Phone Collection
    if (state.step === "collecting_phone" || isValidPakistaniPhone(rawInput)) {
      const phoneClean = rawInput.replace(/[^\d+]/g, "");
      const formattedPhone = isValidPakistaniPhone(phoneClean) ? phoneClean : "0315-4245424";

      return NextResponse.json({
        reply: `Got it (${formattedPhone})! 🏠 Finally, please provide your **Complete Delivery Address & City** (e.g., House 14, Street 5, Gulberg III, Lahore):`,
        sessionState: {
          ...state,
          step: "collecting_address",
          customer: { ...(state.customer || {}), phoneNumber: formattedPhone },
        },
      });
    }

    // 11. Handling Address Collection -> Produces Order Summary
    if (state.step === "collecting_address" || (state.step === "collecting_name" && rawInput.length > 15)) {
      const address = rawInput;
      const updatedCustomer = {
        ...(state.customer || {}),
        address: address,
        city: address.toLowerCase().includes("karachi")
          ? "Karachi"
          : address.toLowerCase().includes("islamabad")
          ? "Islamabad"
          : address.toLowerCase().includes("rawalpindi")
          ? "Rawalpindi"
          : address.toLowerCase().includes("faisalabad")
          ? "Faisalabad"
          : "Lahore",
        paymentMethod: "COD" as const,
      };

      const cart =
        state.cart && state.cart.length > 0
          ? state.cart
          : liveCart && liveCart.length > 0
          ? liveCart
          : [{ id: "sample", product: PRODUCTS[0], size: PRODUCTS[0].sizes[0], quantity: 1 }];

      const subtotal = cart.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
      const shippingFee = subtotal >= SITE_CONFIG.shipping.freeThreshold ? 0 : SITE_CONFIG.shipping.flatRate;
      const total = subtotal + shippingFee;

      return NextResponse.json({
        reply: `Please review your order summary below. Tap **Confirm Order (Cash on Delivery)** to complete!`,
        orderSummary: {
          items: cart,
          customer: updatedCustomer,
          subtotal,
          shippingFee,
          total,
        },
        chips: ["Confirm Order (Cash on Delivery)", "Add More Items", "Cancel"],
        sessionState: {
          ...state,
          step: "reviewing_order",
          customer: updatedCustomer,
          cart: cart,
        },
      });
    }

    // 12. General Product Search Fallback
    const searchMatches = await productRepository.searchProducts(text);
    if (searchMatches.length > 0) {
      const topMatches = searchMatches.slice(0, 4);
      return NextResponse.json({
        reply: `Found ${searchMatches.length} matching item(s) for "${rawInput}":`,
        products: topMatches,
        chips: topMatches.map((p) => `Pick ${p.sku}`),
        sessionState: { ...state, step: "browsing" },
      });
    }

    // 13. Default friendly guide
    return NextResponse.json({
      reply: `Assalam o Alaikum! I can help you find products, choose sizes, and place an order in under 2 minutes. What are you looking for today?`,
      chips: ["Boys Eastern Wear", "Toddler Range", "Kids Accessories", "Clearance Deals"],
      sessionState: { step: "browsing", cart: [], customer: {} },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "I had a temporary connection hiccup. You can also chat directly with our team on WhatsApp: 0315-4245424.",
      chips: ["WhatsApp Support", "Boys Wear", "Toddlers"],
    });
  }
}
