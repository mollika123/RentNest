"use client";
import React, { useState, useEffect } from "react";

export default function ReviewSection({
  propertyId,
  existingReviews,
  user,
}) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingReviews) {
      setReviews(existingReviews);
    }
  }, [existingReviews]);

  // 🚫 NOT TENANT = BLOCK UI
  if (user?.role !== "tenant") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">
          Only tenants can submit reviews.
        </p>
      </div>
    );
  }

  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  if (!comment.trim()) return;

  setSubmitting(true);

  const newReview = {
    propertyId,
    reviewerName: user?.name,
    reviewerEmail: user?.email,
    rating: Number(rating),
    comment: comment.trim(),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      setReviews((prev) => [data.review, ...prev]); // FIXED
      setComment("");
      setRating(5);
    } else {
      alert(data.error || "Failed to submit review");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Tenant Reviews</h3>

      {/* REVIEW FORM */}
      <form
        onSubmit={handleReviewSubmit}
        className="bg-gray-50 border border-gray-100 p-5 rounded-xl space-y-4"
      >
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Write a Review
        </h4>

        {/* RATING */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Rating
          </label>

          <select
            value={rating}
           onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>
        </div>

        {/* COMMENT */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Comment
          </label>

          <textarea
            rows="3"
            required
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white resize-none"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-2.5 rounded-lg disabled:bg-gray-300"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* REVIEWS LIST */}
      <div className="space-y-3 pt-2">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            No reviews yet for this property.
          </p>
        ) : (
          reviews.map((rev, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-sm font-bold text-gray-800">
                    {rev.reviewerName}
                  </h5>

                  <p className="text-xs text-gray-500">
                    {rev.reviewerEmail}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* RATING */}
              <div className="text-yellow-500 mt-2">
                {"⭐".repeat(rev.rating)}
              </div>

              {/* COMMENT */}
              <p className="text-sm text-gray-600 mt-2">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}