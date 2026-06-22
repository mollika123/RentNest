"use client";
import React, { useState, useEffect } from "react";

export default function ReviewSection({ propertyId, existingReviews }) {
  const [reviews, setReviews] = useState([]);
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingReviews) {
      setReviews(existingReviews);
    }
  }, [existingReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;
    
    setSubmitting(true);

    const newReview = {
      propertyId,
      reviewerName: reviewerName.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    try {
      // ⚠️ ফিক্স: এখানে সরাসরি আপেক্ষিক পাথের বদলে এক্সপ্রেসের ফুল পোর্ট ইউআরএল ব্যবহার করুন
      // ধরুন আপনার এক্সপ্রেস ব্যাকএন্ড ৫০০০ পোর্টে চলছে:
      const response = await fetch("http://localhost:5000/api/properties/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        setReviewerName("");
        setComment("");
        setRating(5);
      } else {
        alert(data.error || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Could not connect to the backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Tenant Reviews</h3>

      <form onSubmit={handleReviewSubmit} className="bg-gray-50 border border-gray-100 p-5 rounded-xl space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Write a Review</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:border-gray-400 text-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:border-gray-400 text-gray-800 cursor-pointer"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
              <option value="4">⭐⭐⭐⭐ (4/5)</option>
              <option value="3">⭐⭐⭐ (3/5)</option>
              <option value="2">⭐⭐ (2/5)</option>
              <option value="1">⭐ (1/5)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Comment</label>
          <textarea
            rows="3"
            required
            placeholder="Share your experience staying or viewing this property..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:border-gray-400 text-gray-800 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors shadow-sm disabled:bg-gray-300"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div className="space-y-3 pt-2">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No reviews yet for this property. Be the first to add one!</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-sm font-bold text-gray-800">{rev.reviewerName}</h5>
                  <p className="text-xs text-yellow-500 mt-0.5">{"⭐".repeat(rev.rating)}</p>
                </div>
                <span className="text-xs text-gray-400">{rev.createdAt}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 bg-gray-50/40 p-2.5 rounded-lg border border-gray-50">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}