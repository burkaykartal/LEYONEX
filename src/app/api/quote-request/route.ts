import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Debug: Environment variable kontrolü
    const apiKey = process.env.RESEND_API_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key starts with re_:', apiKey?.startsWith('re_'));

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sistem hatası: API key bulunamadı. Lütfen site yöneticisiyle iletişime geçin.'
        },
        { status: 500 }
      );
    }

    // Resend import
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    // E-posta HTML içeriği
    const emailHtml = `
      <h2>🎯 Yeni Fuar Organizasyon Talebi</h2>

      <h3>👤 Firma Bilgileri</h3>
      <ul>
        <li><strong>Firma:</strong> ${formData.companyName}</li>
        <li><strong>Yetkili:</strong> ${formData.contactPerson}</li>
        <li><strong>E-posta:</strong> ${formData.email}</li>
        <li><strong>Telefon:</strong> ${formData.phone}</li>
      </ul>

      <h3>🎪 Fuar Bilgileri</h3>
      <ul>
        <li><strong>Fuar:</strong> ${formData.fairName}</li>
        <li><strong>Tarih:</strong> ${formData.fairDate}</li>
        <li><strong>Lokasyon:</strong> ${formData.fairLocation}</li>
      </ul>
    `;

    console.log('Attempting to send email...');

    // E-posta gönder
    const { data, error } = await resend.emails.send({
      from: 'Leyonex <onboarding@resend.dev>',
      to: ['burkay.kartal@ibavalresa.com.tr'], // GEÇİCİ: Senin e-postan
      replyTo: formData.email,
      subject: `Yeni Teklif: ${formData.companyName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          success: false,
          message: `E-posta hatası: ${error.message || 'Bilinmeyen hata'}`
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Talebiniz başarıyla gönderildi!',
      emailId: data?.id
    });

  } catch (error: any) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      {
        success: false,
        message: `Sistem hatası: ${error.message || 'Bilinmeyen hata'}`
      },
      { status: 500 }
    );
  }
}
