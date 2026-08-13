import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/reviews/recent", { withCredentials: true });
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold mb-4">All Reviews</h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.name} className="border-b border-gray-100 pb-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {review.name.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{review.name}</p>
                    <span className="text-yellow-500 text-sm">{"★".repeat(review.rating)}</span>
                  </div>
                  <p className="text-sm mt-2">{review.review}</p>
                  <p className="text-xs text-gray-400 mt-1">{review.property}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews found</p>
      )}
    </div>
  );
}

export default ReviewsSection;
