import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type Quote = {
  name: string;
  phone: string;
  email: string;
  product_name?: string;
  quantity?: string;
  message?: string;
};

function env() {
  return {
    apiKey: process.env.BREVO_API_KEY || '',
    senderEmail: process.env.BREVO_SENDER_EMAIL || 'noreply@sapnamindustry.com',
    senderName: process.env.BREVO_SENDER_NAME || process.env.COMPANY_NAME || 'Sapnam Industry',
    adminEmail: process.env.ADMIN_EMAIL || 'info@sapnamindustry.com',
    companyName: process.env.COMPANY_NAME || 'Sapnam Industry',
    companyPhone: process.env.COMPANY_PHONE || '',
    companyWebsite: process.env.COMPANY_WEBSITE || '',
  };
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function detailsTable(q: Quote) {
  const row = (label: string, value: string, zebra = false) =>
    `<tr${zebra ? ' style="background:#fff7ed;"' : ''}><td style="padding:10px 12px;font-weight:600;width:140px;color:#374151;">${label}</td><td style="padding:10px 12px;color:#111827;">${escape(value || '—')}</td></tr>`;
  return `<table style="width:100%;border-collapse:collapse;border:1px solid #f3f4f6;border-radius:8px;overflow:hidden;">
    ${row('Name', q.name)}
    ${row('Phone', q.phone, true)}
    ${row('Email', q.email)}
    ${row('Product', q.product_name || '', true)}
    ${row('Quantity', q.quantity || '')}
    ${row('Message', q.message || '', true)}
  </table>`;
}

function shell(title: string, intro: string, body: string, footer?: string) {
  const { companyName, companyPhone, companyWebsite, adminEmail } = env();
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f9fafb;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#f97316;color:#ffffff;padding:22px 28px;">
        <h2 style="margin:0;font-size:20px;">${escape(title)}</h2>
        <p style="margin:6px 0 0;font-size:13px;opacity:0.95;">${escape(companyName)}</p>
      </div>
      <div style="padding:24px 28px;color:#374151;font-size:14px;line-height:1.6;">
        ${intro}
        ${body}
        ${footer || ''}
        <p style="margin:24px 0 0;color:#6b7280;font-size:12px;border-top:1px solid #f3f4f6;padding-top:16px;">${escape(companyName)}${companyPhone ? ' &nbsp;•&nbsp; ' + escape(companyPhone) : ''}${adminEmail ? ' &nbsp;•&nbsp; ' + escape(adminEmail) : ''}${companyWebsite ? '<br/><a href="' + escape(companyWebsite) + '" style="color:#f97316;text-decoration:none;">' + escape(companyWebsite) + '</a>' : ''}</p>
      </div>
    </div>
  </div>`;
}

async function sendBrevo(payload: {
  to: { email: string; name?: string };
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
}) {
  const { apiKey, senderEmail, senderName } = env();
  if (!apiKey) return { ok: false, reason: 'BREVO_API_KEY missing' };

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [payload.to],
        replyTo: payload.replyTo,
        subject: payload.subject,
        htmlContent: payload.html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Brevo error:', res.status, text);
      return { ok: false, reason: text };
    }
    return { ok: true };
  } catch (err) {
    console.error('Brevo fetch failed:', err);
    return { ok: false, reason: String(err) };
  }
}

async function sendQuoteEmails(quote: Quote) {
  const { adminEmail, companyName } = env();

  const adminHtml = shell(
    'New Quote Request',
    '<p style="margin:0 0 16px;">You just received a new quote request through the website.</p>',
    detailsTable(quote)
  );

  const clientIntro = `
    <p style="margin:0 0 14px;font-size:16px;color:#111827;">Hi ${escape(quote.name)},</p>
    <p style="margin:0 0 14px;">Thank you for reaching out to <strong>${escape(companyName)}</strong>. We have received your enquiry and truly appreciate your interest in our products.</p>
    <p style="margin:0 0 14px;">Our team is already reviewing your request, and one of our representatives will personally get in touch with you <strong>within the next 24 hours</strong> to discuss your requirements in detail and share the best possible quotation.</p>
    <p style="margin:0 0 18px;">For your reference, here is a summary of the details you shared with us:</p>
  `;

  const clientFooter = `
    <div style="margin-top:20px;padding:16px 18px;background:#fff7ed;border-left:4px solid #f97316;border-radius:6px;">
      <p style="margin:0 0 8px;color:#111827;"><strong>What happens next?</strong></p>
      <ul style="margin:0;padding-left:20px;color:#374151;">
        <li style="margin-bottom:6px;">Our sales team will review your requirement carefully.</li>
        <li style="margin-bottom:6px;">We will contact you on your phone or email shortly.</li>
        <li>You will receive a detailed quotation tailored to your needs.</li>
      </ul>
    </div>
    <p style="margin:20px 0 0;">If you have any urgent questions in the meantime, feel free to reply directly to this email — we are always happy to help.</p>
    <p style="margin:16px 0 0;">Warm regards,<br/><strong>Team ${escape(companyName)}</strong></p>
  `;

  const clientHtml = shell(
    'Thank you for your enquiry',
    clientIntro,
    detailsTable(quote),
    clientFooter
  );

  await Promise.all([
    sendBrevo({
      to: { email: adminEmail, name: 'Admin' },
      subject: `New Quote: ${quote.product_name || 'General enquiry'} — ${quote.name}`,
      html: adminHtml,
      replyTo: { email: quote.email, name: quote.name },
    }),
    sendBrevo({
      to: { email: quote.email, name: quote.name },
      subject: `Thank you for your enquiry — ${companyName}`,
      html: clientHtml,
      replyTo: { email: adminEmail, name: companyName },
    }),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Quote;
    const { name, phone, email, product_name, quantity, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('quotes')
      .insert({
        name,
        phone,
        email,
        product_name: product_name || '',
        quantity: quantity || '',
        message: message || '',
      });

    if (error) {
      console.error('Quote insert failed:', error);
      return NextResponse.json({ error: error.message || 'Failed to save quote' }, { status: 500 });
    }

    try {
      await sendQuoteEmails({ name, phone, email, product_name, quantity, message });
    } catch (mailErr) {
      console.error('Quote email send failed:', mailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
