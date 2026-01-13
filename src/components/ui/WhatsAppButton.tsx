'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumber = '905439607076'; // +90 543 960 70 76
  const message = 'Merhaba, fuar organizasyon hizmetleriniz hakkında bilgi almak istiyorum.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110"
      aria-label="WhatsApp ile iletişime geç"
    >
      <FaWhatsapp className="h-8 w-8" />
    </a>
  );
}
