import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
console.log(searchParams);
  const {session_id} =await searchParams

  console.log(session_id,"ssssss");

  if (!session_id)
    throw new Error('Please provide a valid session_id')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const {
    status,
    metadata,
    customer_details
  } = session;

  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {

    const title = metadata?.title || "Item";
    const price = metadata?.price || "0";

    const paymentData = {
      propertyId: metadata?.propertyId,
      propertyName: title,
      email: customerEmail || metadata?.userEmail,
      userName: metadata?.userName || "Guest",
      phone: metadata?.phone || "",
      moveInDate: metadata?.moveInDate || new Date().toISOString(),
      stripeSessionId: session_id,
      amount: price
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(paymentData)
        }
      );

      const data = await res.json();
      console.log("BOOKING RESPONSE:", data);

    } catch (err) {
      console.log("Booking API error:", err);
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-sans">

        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl text-center">

          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold">
            Payment Successful 🎉
          </h2>

          <div className="bg-gray-50 p-4 rounded-xl text-left mt-4">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">
              ৳{Number(price).toLocaleString()}
            </p>
            <p className="text-xs mt-2">{customerEmail}</p>
          </div>

          <p className="text-xs text-gray-400">
            Booking has been created successfully.
          </p>

          <Link
            href="/my-bookings"
            className="inline-block mt-4 text-blue-600"
          >
            Go to My Bookings
          </Link>

        </div>
      </div>
    );
  }

  return null;
}