import React from "react";
import { Card, Avatar } from "@heroui/react";
import { Star, Quote } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Property Portfolio Owner (12 Units)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5,
      title: "Saved me hours of chasing rent!",
      comment:
        "The automated rent collection is a game-changer. Tenants receive text reminders, pay digitally, and the money drops straight into my account. I haven't tracked down a paper check in months.",
    },
    {
      name: "Marcus Vance",
      role: "Independent Landlord",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      title: "Flawless tenant screening",
      comment:
        "The screening setup on RentNest runs credit, eviction, and background histories instantly. Found my last two tenants through it, and they've been incredibly reliable and clean.",
    },
    {
      name: "Elena Rostova",
      role: "Tenant at Nestway Towers",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      rating: 5,
      title: "So easy as a renter",
      comment:
        "I love using RentNest from the tenant side. Submitting maintenance requests takes two seconds, and I can split rent with my roommate seamlessly directly inside the portal.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-default-50/50 relative overflow-hidden">
      {/* Background soft ambient decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-success/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-success/20 bg-success/5 text-xs font-semibold uppercase tracking-wider text-success">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Loved by Landlords & Tenants Alike
          </h2>
          <p className="text-default-500 max-w-xl text-base sm:text-lg">
            See how RentNest is removing the friction from modern rental management across thousands of active properties.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group border border-default-200 bg-background hover:border-default-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <Card.Header className="p-6 pb-2 flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={review.avatar}
                    name={review.name}
                    className="w-12 h-12 border-2 border-default-100"
                  />
                  <div className="flex flex-col">
                    {/* Hero UI v3 clean structural typography titles */}
                    <Card.Title className="text-base font-bold text-foreground">
                      {review.name}
                    </Card.Title>
                    <Card.Description className="text-xs text-default-400">
                      {review.role}
                    </Card.Description>
                  </div>
                </div>

                {/* Decorative Quote Icon floating upper right */}
                <Quote className="w-8 h-8 text-default-200/60 group-hover:text-primary/20 transition-colors duration-300" />
              </Card.Header>

              <Card.Content className="p-6 pt-2 flex-grow space-y-3">
                {/* Dynamic Star Ratings Row */}
                <div className="flex items-center space-x-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Review Body */}
                <div className="space-y-1.5">
                  <h4 className="text-md font-semibold text-foreground">
                    "{review.title}"
                  </h4>
                  <p className="text-sm text-default-500 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}