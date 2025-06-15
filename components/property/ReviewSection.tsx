// components/property/ReviewSection.tsx
import React, { useState } from "react";
import { ReviewProps } from "@/interfaces/index";

interface ReviewSectionProps {
  reviews: ReviewProps[];
  averageRating: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  averageRating,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Reviews Header */}
      <div className="flex items-center space-x-4 mb-6">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-medium text-lg">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-600">
            ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-b-0">
            {/* Reviewer Info */}
            <div className="flex items-center mb-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  // Fallback to a default avatar if image fails to load
                  (e.target as HTMLImageElement).src =
                    "/assets/images/default-avatar.png";
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition duration-200"
        >
          {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
