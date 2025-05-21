import React, { useEffect, useState, useCallback } from "react";
import '../Review.css'; // Make sure your CSS is correctly linked

export const Reviews = ({ shopId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the current logged-in user's ID from sessionStorage
    // Convert to string for strict comparison with review.user_id (which might be number from backend)
    const currentUserId = sessionStorage.getItem("id");

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:5000/get_reviews/${shopId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Failed to load reviews. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [shopId]); // shopId is a dependency for fetching reviews

    // Effect to fetch reviews when the component mounts or shopId changes
    useEffect(() => {
        if (shopId) {
            fetchReviews();
        }
    }, [shopId, fetchReviews]); // fetchReviews is also a dependency because it's a useCallback now

    const handleDeleteReview = useCallback(async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
            return; // User cancelled
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/delete_review", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review_id: reviewId,
                    user_id: currentUserId, // Send the logged-in user's ID for verification
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete review");
            }

            alert("Review deleted successfully!");
            fetchReviews(); // Re-fetch reviews to update the list and implicitly update shop rating in Profile
        } catch (err) {
            console.error("Error deleting review:", err);
            setError(err.message || "An unexpected error occurred during deletion.");
        }
    }, [currentUserId, fetchReviews]); // Dependencies: currentUserId and fetchReviews


    if (loading) {
        return <div className="reviews-loading">Loading reviews...</div>;
    }

    if (error) {
        return <div className="reviews-error">{error}</div>;
    }

    if (reviews.length === 0) {
        return <div className="no-reviews">No reviews yet. Be the first to leave one!</div>;
    }

    return (
        <div className="reviews-list">
            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <div className="review-header">
                        <span className="review-author">Name: {review.username || `User ${review.user_id}`}</span>
                        <span className="review-rating">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                        <span className="review-date">
                            Date: {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    {review.comment && <p className="review-comment">{review.comment}</p>}

                    {currentUserId && String(review.user_id) === currentUserId && (
                        <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="delete-review-btn"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};