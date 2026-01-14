import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Initialize Resend with API key check
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { success: false, message: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const formData = await request.json();

    // E-posta içeriğini oluştur
    const emailHtml = `
      <h2>🎯 Yeni Fuar Organizasyon Talebi</h2>

      <h3>👤 Firma Bilgileri</h3>
      <ul>
        <li><strong>Firma Adı:</strong> ${formData.companyName}</li>
        <li><strong>Yetkili:</strong> ${formData.contactPerson}</li>
        <li><strong>E-posta:</strong> ${formData.email}</li>
        <li><strong>Telefon:</strong> ${formData.phone}</li>
        ${formData.taxNumber ? `<li><strong>Vergi No:</strong> ${formData.taxNumber}</li>` : ''}
        ${formData.address ? `<li><strong>Adres:</strong> ${formData.address}</li>` : ''}
      </ul>

      <h3>🎪 Fuar Bilgileri</h3>
      <ul>
        <li><strong>Fuar Adı:</strong> ${formData.fairName}</li>
        <li><strong>Tarih:</strong> ${formData.fairDate}</li>
        <li><strong>Lokasyon:</strong> ${formData.fairLocation}</li>
        ${formData.standSize ? `<li><strong>Stand Alanı:</strong> ${formData.standSize} m²</li>` : ''}
        ${formData.expectedVisitors ? `<li><strong>Beklenen Ziyaretçi:</strong> ${formData.expectedVisitors}</li>` : ''}
      </ul>

      <h3>🛠️ Seçilen Hizmetler</h3>
      <ul>
        ${formData.standDesign ? `<li>✅ Stand Tasarımı (${formData.standTypes?.join(', ') || 'Belirtilmedi'})</li>` : ''}
        ${formData.hostesService ? `<li>✅ Hostes & Personel (${formData.hostesCount || ''} kişi, Diller: ${formData.hostesLanguages?.join(', ') || 'Belirtilmedi'})</li>` : ''}
        ${formData.accommodationService ? `<li>✅ Konaklama (${formData.accommodationParticipants || ''} kişi, ${formData.accommodationDuration || ''}, ${formData.accommodationHotelCategory || ''})</li>` : ''}
        ${formData.cateringService ? `<li>✅ İkram Hizmetleri (${formData.cateringTypes?.join(', ') || 'Belirtilmedi'})</li>` : ''}
        ${formData.photographyService ? `<li>✅ Fotoğraf & Video (${formData.photographyTypes?.join(', ') || 'Belirtilmedi'})</li>` : ''}
        ${formData.transportationService ? `<li>✅ Ulaşım (${formData.transportationTypes?.join(', ') || 'Belirtilmedi'})</li>` : ''}
        ${formData.giftService ? `<li>✅ Kurumsal Hediye (${formData.giftQuantity || ''} adet, Bütçe: ${formData.giftBudget || 'Belirtilmedi'})</li>` : ''}
        ${formData.galaService ? `<li>✅ Gala & Etkinlik (${formData.galaType || ''}, ${formData.galaParticipants || ''} kişi)</li>` : ''}
        ${formData.consultingService ? `<li>✅ Danışmanlık (${formData.consultingTypes?.join(', ') || 'Belirtilmedi'})</li>` : ''}
      </ul>

      ${formData.budget ? `<h3>💰 Bütçe</h3><p>${formData.budget}</p>` : ''}

      ${formData.generalNotes ? `<h3>📝 Notlar</h3><p>${formData.generalNotes}</p>` : ''}
    `;

    // E-posta gönder
    const { data, error } = await resend.emails.send({
      from: 'Leyonex <onboarding@resend.dev>',
      to: ['info@leyonex.com'],
      replyTo: formData.email,
      subject: `🎯 Yeni Teklif Talebi: ${formData.companyName} - ${formData.fairName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'E-posta gönderilemedi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Talebiniz başarıyla alındı! En kısa sürede size dönüş yapacağız.',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
