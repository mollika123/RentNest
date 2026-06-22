import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // 💡 আপনার মেটাডাটা থেকে তথ্যগুলো বের করে নেওয়া হচ্ছে
    const title = metadata?.title || 'Item'
    const price = metadata?.price || '0'

    // api call hbe ekhane

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-300">
          
          {/* গ্রিন সাকসেস আইকন অ্যানিমেশন সহ */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          {/* প্রধান টেক্সট হেডিং */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Payment Successful!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for your purchase. We appreciate your business!
            </p>
          </div>

          {/* অর্ডারের সংক্ষিপ্ত বিবরণী কার্ড */}
          <div className="bg-gray-50 rounded-xl p-4 my-6 text-left border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Order Details
            </h3>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[220px]">
                {title}
              </span>
              <span className="text-sm font-bold text-gray-900">
                ৳{Number(price).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-center">
              <span className="text-xs text-gray-400">Account Email:</span>
              <span className="text-xs font-mono text-gray-600 truncate max-w-[200px]">
                {customerEmail}
              </span>
            </div>
          </div>

          {/* সাপোর্ট নোটিশ */}
          <p className="text-xs text-gray-400 leading-relaxed">
            A confirmation email has been sent to{' '}
            <span className="font-semibold text-gray-600">{customerEmail}</span>.
            <br />
            For any queries, contact{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-medium">
              support@example.com
            </a>
          </p>

          {/* অ্যাকশন বাটন */}
          <div className="pt-2">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-[#171717] hover:bg-[#262626] transition-colors shadow-sm"
            >
              Back to Home
            </Link>
          </div>
          
        </div>
      </div>
    )
  }
}