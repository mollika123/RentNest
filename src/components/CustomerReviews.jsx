import { Card, Avatar } from "@heroui/react";
import { Star } from "lucide-react"; 
import * as motion from "framer-motion/client"; 

export default async function CustomerReviews() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/tenant/reviews`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data = await res.json();
    const reviews = Array.isArray(data) ? data : [];

    if (reviews.length === 0) {
      return (
        <div className="text-center py-16 text-slate-500 font-medium">
          No reviews found
        </div>
      );
    }

    return (
      <section className="py-20 px-4 container mx-auto max-w-7xl">
        {/* HEADING SECTION WITH FRAMER MOTION */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold uppercase tracking-widest text-cyan-900 "
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-2 text-gray-600 tracking-tight"
          >
            Customer Reviews
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1 bg-violet-900 mx-auto mt-4  rounded-full"
          />
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => {
            const rating = Math.max(0, Math.min(5, Number(rev.rating) || 0));
            const reviewId = rev._id || index;
            const reviewerName = rev.reviewerName || rev.name || "Anonymous";
            const reviewerEmail = rev.reviewerEmail || rev.role || "";

            return (
              <motion.div
                key={reviewId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* সরাসরি Card এর ভেতরেই প্যাডিং দিয়ে ডিজাইন করা হয়েছে */}
                <Card className="bg-slate-900 border border-slate-800/80 shadow-xl rounded-2xl hover:border-slate-700/60 transition-all duration-300 p-6 flex flex-col gap-4">
                  {/* STARS */}
                  <div className="flex gap-0.5">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={`${reviewId}-star-${i}`}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Star
                        key={`${reviewId}-empty-${i}`}
                        className="w-4 h-4 text-slate-700"
                      />
                    ))}
                  </div>

                  {/* COMMENT */}
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* PROFILE DETAILS */}
                  <div className="flex items-center gap-3.5 mt-2 pt-4 border-t border-slate-800/60">
                    <Avatar 
                      name={reviewerName} 
                      className="w-11 h-11 text-sm font-semibold bg-violet-600 text-white ring-2 ring-violet-500/30 object-cover"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {reviewerName}
                      </h4>
                      <span className="text-slate-500 text-xs mt-0.5">
                        {reviewerEmail}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return (
      <div className="text-center py-16 text-red-500 font-medium">
        Failed to load reviews
      </div>
    );
  }
}