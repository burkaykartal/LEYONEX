"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905xxxxxxxxx";

  const handleClick = () => {
    const message = encodeURIComponent(
      "Merhaba, Luna 360 Expo hakkında bilgi almak istiyorum."
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle
        size={28}
        className="group-hover:rotate-12 transition-transform"
      />
      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse" />
    </button>
  );
}
