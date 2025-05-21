// Profile.js
import { useParams } from "react-router-dom";
import { Reviews } from "./Reviews";
import { useShops } from './ShopsContext';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { ReviewForm } from './ReviewForm';

export const Profile = () => {
    const { shops: allShopsFromContext, fetchShops } = useShops();
    const { userId } = useParams();

    const [currentShop, setCurrentShop] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewsKey, setReviewsKey] = useState(0);

    const handleWriteReviewClick = useCallback(() => {
        const sessionUserId = sessionStorage.getItem("id");
        if (!sessionUserId) {
            alert("You must be logged in to write a review.");
            return;
        }
        setShowReviewForm(true);
    }, []);

    const handleReviewSubmitted = useCallback(() => {
        setShowReviewForm(false);
        setReviewsKey(prevKey => prevKey + 1);
        fetchShops(); // Re-fetch shops to get updated rating and potential other shop details
    }, [fetchShops]);

    const handleCancelReview = useCallback(() => {
        setShowReviewForm(false);
    }, []);

    useEffect(() => {
        if (Array.isArray(allShopsFromContext) && allShopsFromContext.length > 0) {
            const foundShop = allShopsFromContext.find(shop => shop.shopcode === userId);
            setCurrentShop(foundShop);
        } else {
            setCurrentShop(null);
        }
    }, [allShopsFromContext, userId]);

    const shopName = currentShop ? currentShop.name : "Shop Not Found";
    const shopAddress = currentShop ? currentShop.address : "N/A";
    const shopImage = currentShop ? currentShop.image : "/repairShops/abs.png";

    const shopEmail = "N/A"; // Placeholder, fetch from DB if available
    const shopContact = "N/A"; // Placeholder, fetch from DB if available

    // --- New: Parse and prepare data for display ---
    // Ensure data is parsed correctly. MySQL's JSON type usually comes as an object,
    // but if it's stored as TEXT, it will be a string and needs parsing.
    const openingHours = currentShop && currentShop.opening_hours
        ? (typeof currentShop.opening_hours === 'string'
            ? JSON.parse(currentShop.opening_hours)
            : currentShop.opening_hours)
        : {}; // Default to empty object if not present or null

    const specializations = currentShop && currentShop.specializations
        ? (typeof currentShop.specializations === 'string'
            ? JSON.parse(currentShop.specializations)
            : currentShop.specializations)
        : []; // Default to empty array

    const services = currentShop && currentShop.services
        ? (typeof currentShop.services === 'string'
            ? JSON.parse(currentShop.services)
            : currentShop.services)
        : []; // Default to empty array
    // --- End New Data Parsing ---

    let averageRating = 0;
    let totalRatings = 0;

    if (currentShop && currentShop.rating) {
        try {
            const ratings = typeof currentShop.rating === 'string' ? JSON.parse(currentShop.rating) : currentShop.rating;
            totalRatings = Object.values(ratings).reduce((sum, val) => sum + val, 0);
            averageRating = totalRatings === 0
                ? 0
                : (
                    (ratings["1"] * 1 +
                    ratings["2"] * 2 +
                    ratings["3"] * 3 +
                    ratings["4"] * 4 +
                    ratings["5"] * 5) / totalRatings
                );
        } catch (e) {
            console.error("Error parsing rating JSON for shop:", shopName, e);
            averageRating = 0;
            totalRatings = 0;
        }
    }

    if (currentShop === null) {
        if (!allShopsFromContext || allShopsFromContext.length === 0) {
            return (
                <main>
                    <div className="container padding-block-80">
                        <h1>Loading shop data...</h1>
                    </div>
                </main>
            );
        } else {
            return (
                <main>
                    <div className="container padding-block-80">
                        <h1>Shop not found.</h1>
                        <p>Please check the URL or return to the <Link to="/shops">shops list</Link>.</p>
                    </div>
                </main>
            );
        }
    }

    // Define the order of days for consistent display
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <main>
            <section>
                <div className="container">
                    <div className="user-primary-section">
                        <div className="cover-container">
                            <img className="cover-photo" src={shopImage} alt={`${shopName} cover`}/>
                        </div>
                        <div className="primary-user-section">
                            <div className="profile-photo-container">
                                <img className="profile-photo" src={shopImage} alt={`${shopName} profile`}/>
                            </div>
                            <div>
                                <h3 className="shop-name">{shopName}</h3>
                                <div className="primary-user-description">
                                    <div>
                                        <h3>Ratings: {averageRating.toFixed(1)} ({totalRatings} reviews)</h3>
                                        <h3>Contact: {shopContact}</h3>
                                    </div>
                                    <div>
                                        <h3>Email: {shopEmail}</h3>
                                        <h3 className="user-address">Address: {shopAddress}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="shop-content | margin-block-32">
                        <div className="review-container | shop-info">
                            <h2>Reviews</h2>
                            {!showReviewForm && (
                                <button onClick={handleWriteReviewClick} className="btn-write-review">
                                    Write a Review
                                </button>
                            )}

                            {showReviewForm && (
                                <ReviewForm
                                    shopId={currentShop.id}
                                    onReviewSubmit={handleReviewSubmitted}
                                    onCancel={handleCancelReview}
                                />
                            )}

                            <Reviews key={reviewsKey} shopId={currentShop.id} />
                        </div>

                        {/* THIS IS THE SPECIFIC DIV YOU ASKED TO MODIFY */}
                        <div className="info-container | shop-info">
                            <div className="opening-hours | inner-info">
                                <h2>Opening Hours</h2>
                                <div>
                                    {/* Display opening hours */}
                                    {daysOfWeek.map(day => (
                                        <p key={day}>
                                            <emph>{day}:</emph> {openingHours[day] || 'Closed'}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* New: Specializations Section */}
                            <div className="specializations-section | inner-info">
                                <h2>Repair Specializations</h2>
                                <div>
                                    {specializations.length > 0 ? (
                                        specializations.map((spec, index) => (
                                            <span key={index} className="specialization-tag">
                                                {spec}{index < specializations.length - 1 ? ', ' : ''}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No specializations listed.</p>
                                    )}
                                </div>
                            </div>

                            {/* New: Services Offered Section */}
                            <div className="services-offered-section | inner-info">
                                <h2>Services Offered</h2>
                                {services.length > 0 ? (
                                    <ul>
                                        {services.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No services listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};