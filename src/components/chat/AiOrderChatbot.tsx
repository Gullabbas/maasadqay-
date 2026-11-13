"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Phone,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  Truck,
  ExternalLink,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useChatUIStore, useCartStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  products?: Product[];
  orderSummary?: {
    items: any[];
    customer: any;
    subtotal: number;
    shippingFee: number;
    total: number;
  };
  confirmedOrder?: any;
  chips?: string[];
}

export default function AiOrderChatbot() {
  const { isOpen, closeChat, toggleChat } = useChatUIStore();
  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [sessionState, setSessionState] = useState<any>({ step: "greeting", cart: [], customer: {} });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome greeting & live cart detection
  useEffect(() => {
    const initialGreeting: ChatMessage = {
      id: "msg-welcome",
      sender: "bot",
      text:
        cartItems.length > 0
          ? `Assalam o Alaikum! 👋 I see you have ${cartItems.length} item(s) in your shopping bag! Would you like me to take your delivery details and place this order via Cash on Delivery?`
          : "Assalam o Alaikum! 👋 I'm Maa Sadqay's digital order assistant. You can tell me what you're looking for (e.g. \"boys kurta\", \"toddler onesie\", \"accessories\"), or order your entire parcel right here!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      chips:
        cartItems.length > 0
          ? ["Checkout Bag Items (COD)", "Boys Eastern Wear", "Toddler Range", "Kids Accessories"]
          : ["Boys Eastern Wear", "Toddler Range", "Kids Accessories", "Clearance Deals"],
    };
    setMessages([initialGreeting]);

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to latest message when new message is added or chat opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowTooltip(false);
    }
  }, [messages.length, isOpen]);

  const handleContainerScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;
      setShowScrollBottom(!isAtBottom);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollBottom(false);
  };

  const handleSend = async (textToSend?: string, explicitAction?: string) => {
    const content = textToSend || input;
    if (!content.trim() && !explicitAction) return;
    if (isTyping) return;

    const isConfirm =
      explicitAction === "confirm_order" ||
      content.toLowerCase().includes("confirm order") ||
      content.toLowerCase().includes("confirm & place order");

    const actionToPass = isConfirm ? "confirm_order" : explicitAction;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: content || "Confirm Order (Cash on Delivery)",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          sessionState,
          liveCart: cartItems,
          action: actionToPass,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.confirmedOrder) {
        clearCart();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch (e) {}
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "Thank you!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        products: data.products,
        orderSummary: data.orderSummary,
        confirmedOrder: data.confirmedOrder,
        chips: data.chips,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (data.sessionState) {
        setSessionState(data.sessionState);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: "bot",
          text: "I had a temporary connection hiccup. You can also message our human support team directly on WhatsApp: 0315-4245424.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          chips: ["Talk on WhatsApp", "Restart Chat"],
        },
      ]);
    }
  };

  const handleReset = () => {
    setSessionState({ step: "greeting", cart: [], customer: {} });
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: "Conversation restarted! What product or category would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        chips: ["Boys Eastern Wear", "Toddler Range", "Kids Accessories", "Girls Collection", "Clearance Deals"],
      },
    ]);
  };

  return (
    <>
      {/* Floating Bottom-Right Launcher */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        {!isOpen && showTooltip && (
          <div className="mb-2 bg-ink-primary text-white text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-brand-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
            <span className="text-ochre-300 font-bold">✨ Need help?</span>
            <span>I can take your order right here!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-white/60 hover:text-white ml-1 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={toggleChat}
          aria-label={isOpen ? "Close AI Order Assistant" : "Open AI Order Assistant"}
          className="relative group p-3.5 sm:p-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-glow transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-white"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 animate-pulseGentle" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-brand-500 rounded-full" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window Panel / Mobile Sheet */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[420px] h-[85vh] sm:h-[600px] bg-surface-pure sm:rounded-3xl shadow-modal border border-brand-100 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 pb-safe overscroll-contain">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-brand-900 text-white flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                <Image
                  src="/images/logo.png"
                  alt="Maa Sadqay Assistant"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm">
                  <span>Maa Sadqay Order Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-brand-200">24/7 AI Store Concierge • Lahore</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Talk to human on WhatsApp"
                className="p-1.5 rounded-lg text-emerald-400 hover:bg-white/10 transition-colors"
                aria-label="WhatsApp Support"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleReset}
                title="Restart chat"
                className="p-1.5 rounded-lg text-brand-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={closeChat}
                className="p-1.5 rounded-lg text-brand-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area with Scroll Containment */}
          <div
            ref={scrollContainerRef}
            onScroll={handleContainerScroll}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 space-y-4 chat-messages-scroll bg-surface-warm/40 relative"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Text Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-brand-500 text-white rounded-tr-none font-medium"
                      : "bg-surface-pure text-ink-primary border border-brand-100 rounded-tl-none font-normal"
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-ink-tertiary mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Inline Product Cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex gap-3 p-3 rounded-2xl bg-white border border-brand-200 shadow-sm hover:border-brand-400 transition-all"
                      >
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                          <Image
                            src={prod.images[0] || "/images/boys.webp"}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-brand-500 uppercase">
                              {prod.sku}
                            </span>
                            <h5 className="font-semibold text-xs text-ink-primary line-clamp-1">
                              {prod.name}
                            </h5>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-bold text-xs text-brand-600">
                                {formatPrice(prod.price)}
                              </span>
                              <span className="text-[10px] text-ink-tertiary line-through">
                                {formatPrice(prod.originalPrice)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-ink-secondary">
                              Sizes: {prod.sizes.slice(0, 3).join(", ")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSend(`Pick ${prod.sku}`)}
                              className="px-3 py-1 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[11px] font-bold shadow-xs transition-colors"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Summary Card with Big Confirmation Button */}
                {msg.orderSummary && (
                  <div className="w-full mt-3 p-4 bg-white rounded-2xl border-2 border-brand-400 shadow-md space-y-3">
                    <div className="flex items-center justify-between border-b border-brand-100 pb-2">
                      <span className="font-display font-bold text-xs uppercase text-brand-600">
                        📋 Order Summary
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Cash on Delivery
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-ink-secondary">
                      <div>
                        <strong>Customer:</strong> {msg.orderSummary.customer.fullName} (
                        {msg.orderSummary.customer.phoneNumber})
                      </div>
                      <div>
                        <strong>Address:</strong> {msg.orderSummary.customer.address},{" "}
                        {msg.orderSummary.customer.city}
                      </div>
                      <div className="pt-1 font-semibold text-ink-primary">
                        Items ({msg.orderSummary.items.length}):
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                        {msg.orderSummary.items.map((item: any, i: number) => (
                          <li key={i}>
                            {item.product.name} ({item.product.sku}) — Size: {item.size} x{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-brand-100 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatPrice(msg.orderSummary.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nationwide Shipping:</span>
                        <span>
                          {msg.orderSummary.shippingFee === 0 ? "FREE" : formatPrice(msg.orderSummary.shippingFee)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-brand-600 pt-1 border-t border-brand-100">
                        <span>Total Payable:</span>
                        <span>{formatPrice(msg.orderSummary.total)}</span>
                      </div>
                    </div>

                    {/* Explicit One-Tap Confirm Button with dedicated confirm_order action */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleSend("Confirm Order (Cash on Delivery)", "confirm_order")}
                        className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft hover:shadow-hover transition-all transform active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Confirm & Place Order (Cash on Delivery)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirmed Order Card */}
                {msg.confirmedOrder && (
                  <div className="w-full mt-3 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 shadow-lg space-y-3 text-ink-primary animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>Order Confirmed & Placed!</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs space-y-1">
                      <div>
                        <strong>Order Reference:</strong>{" "}
                        <span className="font-mono font-bold text-brand-600">
                          {msg.confirmedOrder.id}
                        </span>
                      </div>
                      <div>
                        <strong>Total Amount:</strong> {formatPrice(msg.confirmedOrder.total)} (Cash on Delivery)
                      </div>
                      <div>
                        <strong>Delivery Courier:</strong> TCS / Trax (3–5 Business Days)
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href={msg.confirmedOrder.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Confirm Dispatch via WhatsApp</span>
                      </a>

                      <a
                        href={SITE_CONFIG.orderTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Track Shipment Status</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Quick Reply Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          handleSend(
                            chip,
                            chip.toLowerCase().includes("confirm") ? "confirm_order" : undefined
                          )
                        }
                        className="px-3 py-1.5 rounded-full bg-white border border-brand-200 text-[11px] font-semibold text-ink-primary hover:text-white hover:bg-brand-500 hover:border-brand-500 transition-all shadow-xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-pure border border-brand-100 w-20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Floating Scroll to Bottom pill */}
          {showScrollBottom && (
            <button
              type="button"
              onClick={scrollToBottom}
              className="absolute bottom-20 right-6 z-10 px-3 py-1.5 rounded-full bg-brand-900/90 text-white text-[11px] font-semibold flex items-center gap-1 shadow-lg hover:bg-brand-900 transition-all"
            >
              <span>Latest</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-surface-pure border-t border-brand-100 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type 'boys kurta', size, or your address..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-surface-warm border border-brand-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 transition-colors placeholder:text-ink-tertiary"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="p-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white shadow-soft transition-all flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-ink-tertiary text-center mt-1.5 flex items-center justify-center gap-1">
              <span>Real-Time COD Order Placement</span>
              <span>•</span>
              <span>0315-4245424</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
