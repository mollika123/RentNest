import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* সিকিউরিটি লক আইকন (লাল/অরেঞ্জ সতর্কবার্তা ভাইব) */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-2">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>

        {/* হেডিং ও বার্তা */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            401
          </h1>
          <h2 className="text-2xl font-bold text-gray-800">
            Unauthorized Access
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
            Oops! You don&apos;t have permission to access this page. Please log in with an authorized account.
          </p>
        </div>

        <hr className="border-gray-100 my-4" />

        {/* অ্যাকশন বাটন সমূহ */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* লগইন পেজে যাওয়ার বাটন */}
          <Link
            href="/login"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Log In Now
          </Link>
          
          {/* হোমপেজে ফিরে যাওয়ার বাটন */}
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            Back to Home
          </Link>
        </div>

        {/* হেল্পডেস্ক লিংক */}
        <p className="text-xs text-gray-400 pt-2">
          Think this is a mistake? Contact our{" "}
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-medium">
            support team
          </a>.
        </p>
        
      </div>
    </div>
  );
}