import React, { useState } from "react";
import '../Review.css'; // Ensure your CSS is correctly linked

export const ReviewForm = ({ shopId, onReviewSubmit, onCancel }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (rating === 0) {
            setError("Please select a rating.");
            setLoading(false);
            return;
        }

        // Get the actual user ID from sessionStorage
        const userId = sessionStorage.getItem("id");

        if (!userId) {
            setError("User not logged in. Please log in to submit a review.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/add_review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shop_id: shopId,
                    user_id: userId, // Use the dynamically retrieved userId
                    rating: rating,
                    comment: comment,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit review");
            }

            alert("Review submitted successfully!");
            onReviewSubmit(); 
            setRating(0); 
            setComment("");
        } catch (err) {
            console.error("Error submitting review:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="review-form-container">
            <h3>Write a Review</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? "selected" : ""}`}
                                onClick={() => setRating(star)}
                            >
                                &#9733; 
                            </span>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment (optional):</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        placeholder="Share your experience..."
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                    <button type="button" onClick={onCancel} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};