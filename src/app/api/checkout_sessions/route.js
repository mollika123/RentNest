import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // সেশন চেক
    const userSession = await auth.api.getSession({
      headers: await headers()
    })
    const user = userSession?.user

    // 🛑 যদি আপনি ফর্ম সাবমিট (HTML Form Action) থেকে ডাটা পাঠান:
    const formData = await request.formData()
    const price = formData.get('price')
    const title = formData.get('title')
    const propertyId = formData.get('propertyId')
    const bookingId = formData.get('bookingId') // যদি এক্সপ্রেস থেকে বুকিং আইডি পাস করেন

    /* 📢 নোট: যদি ফ্রন্টএন্ড থেকে fetch() দিয়ে JSON পাঠান, তবে উপরের formData-র বদলে নিচের লাইনটি ব্যবহার করবেন:
    const { price, title, propertyId, bookingId } = await request.json();
    */

    // স্ট্রাইপ সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined, // লগইন না থাকলে undefined থাকবে
      line_items: [
        {
          price_data: {
            currency: 'usd', // অথবা 'bdt' আপনার প্রয়োজন অনুযায়ী
            unit_amount: Math.round(Number(price) * 100), // দশমিকের ঝামেলা এড়াতে Math.round
            product_data: {
              name: title || "Property Booking",
            }
          },
          quantity: 1,
        },
      ],
     
      metadata: {
        price: String(price),
        userId: user?.id ? String(user.id) : "guest",
        userEmail: user?.email || "no-email",
        title: String(title),
        propertyId: String(propertyId),
        bookingId: bookingId ? String(bookingId) : "" // এক্সপ্রেসের insertedId এখানে সেভ করে রাখতে পারেন
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/properties`, // ক্যানসেল ইউআরএল দেওয়া ভালো
    });

    // সরাসরি পেমেন্ট পেজে রিডাইরেক্ট (303 See Other স্ট্যান্ডার্ড)
    return NextResponse.redirect(session.url, 303)

  } catch (err) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}