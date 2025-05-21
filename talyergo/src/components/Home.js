import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Map } from "./Map";
import { useShops } from "./ShopsContext"; // Correctly import useShops
import { StarEmpty } from "../svgs/StarEmpty";
import { StarFilled } from "../svgs/StarFilled";
import { StarHalf } from "../svgs/StarHalf";

export const Home = () => {
    // Destructure 'shops' directly from the object returned by useShops
    // The ShopsContext provides an object like { shops: [], fetchShops: func }
    const { shops: shopsFromContext } = useShops();
    
    // Initialize 'shops' state with an empty array.
    // This ensures 'shops' is always an array, preventing the 'filter is not a function' error.
    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState("");
    
    const mapHoverHandler = useRef(null);
    const changeToPath = useNavigate();

    // Use useEffect to update the local 'shops' state whenever 'shopsFromContext' changes.
    // This correctly syncs the component's state with the context's data once it's loaded.
    useEffect(() => {
        // Ensure shopsFromContext is an array before setting the state
        if (Array.isArray(shopsFromContext)) {
            setShops(shopsFromContext);
        }
    }, [shopsFromContext]); // Dependency array ensures this runs when shopsFromContext changes
    
    const navigation = (path) => {
        changeToPath(path);
    };

    const sessionUserId = sessionStorage.getItem("id");

    const [userLocation, setUserLocation] = useState(null);

    const handleFindMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setUserLocation({
                    lat,
                    lng
                });
            },
            () => {
                alert("Unable to retrieve your location.");
            }
        );
    };

    const handleRatingClick = async (shop, star) => {
        if (!sessionUserId) {
            alert("You must be logged in to rate.");
            return;
        }

        const ratingKey = `rated_${shop.id}_${sessionUserId}`;
        const prevStar = localStorage.getItem(ratingKey);

        const ratings = JSON.parse(shop.rating || '{"1":0,"2":0,"3":0,"4":0,"5":0}');

        if (prevStar) {
            if (ratings[prevStar] && ratings[prevStar] > 0) {
                ratings[prevStar] -= 1;
            }
        }

        ratings[star] = (ratings[star] || 0) + 1;

        const payload = {
            table: "shops",
            updates: { rating: JSON.stringify(ratings) },
            condition: `id = ${shop.id}`
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error("Failed to update rating");
            }
            localStorage.setItem(ratingKey, star);
            alert("Rating submitted!");
            setShops(prevShops =>
                prevShops.map(s =>
                    s.id === shop.id
                        ? { ...s, rating: JSON.stringify(ratings) }
                        : s
                )
            );
        } catch (error) {
            alert("Error updating rating: " + error.message);
        }
    };

    // Safely call .filter() only if 'shops' is an array.
    // If 'shops' is not an array (e.g., during initial render before context loads),
    // it defaults to an empty array to prevent the error.
    const filteredShops = Array.isArray(shops)
        ? shops.filter(shop =>
              shop.name.toLowerCase().includes(search.toLowerCase())
          )
        : [];

    const renderStars = (avg, shop) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            let starIcon;
            if (avg >= i) {
                starIcon = <StarFilled />;
            } else if (avg >= i - 0.5) {
                starIcon = <StarHalf />;
            } else {
                starIcon = <StarEmpty />;
            }
            stars.push(
                <span
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                        e.stopPropagation();
                        handleRatingClick(shop, String(i));
                    }}
                    title={`Rate ${i} star${i > 1 ? "s" : ""}`}
                >
                    {starIcon}
                </span>
            );
        }
        return stars;
    };

    return (
        <main>
            <section>
                <div className="h1-container container padding-block-80">
                    <div className="hero-bg-container"></div>
                    <div className="hero-wrapper">
                        <h1 className="main-headings">Find the best mechanics<br></br>for your situation.</h1>
                        <button><Link>Get Started</Link></button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container padding-block-80">
                    <div className="map-wrapper">
                        <h2 className="map-heading | main-headings">Need to find the <span className="map-heading-italic">nearest</span> repair shops now?</h2>
                        <div className="btn-map-wrapper white">
                            <button onClick={handleFindMyLocation}>
                                Find from my location
                            </button>
                        </div>

                        <input
                                type="text"
                                placeholder="Search for shops..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-input" 
                            />

                        <div className="search-wrapper">
                            
                            <aside className="results-wrapper">
                                {filteredShops.length === 0 ? (
                                    <p>No Results Found</p>
                                ) : (
                                    filteredShops.map((shop) => {
                                        const ratings = JSON.parse(shop.rating || '{"1":0,"2":0,"3":0,"4":0,"5":0}');
                                        const totalRatings = Object.values(ratings).reduce((sum, val) => sum + val, 0);
                                        const averageRating = totalRatings === 0
                                            ? 0
                                            : (
                                                (ratings["1"] * 1 +
                                                ratings["2"] * 2 +
                                                ratings["3"] * 3 +
                                                ratings["4"] * 4 +
                                                ratings["5"] * 5) / totalRatings
                                            );
                                        return (
                                            <div key={shop.id} className="results-shops" // Use shop.id for key
                                                onMouseEnter={() => {
                                                    if (mapHoverHandler.current) {
                                                        mapHoverHandler.current(shop.lat, shop.lng, 16);
                                                    }
                                                }}
                                                onClick={() => navigation(shop.path)}>
                                                <h3>{shop.name}</h3>
                                                <div className="ratings-wrapper">
                                                    <p>{averageRating.toFixed(1)}</p>
                                                    <div className="star-wrapper">
                                                        {renderStars(averageRating, shop)}
                                                    </div>
                                                    <p>({totalRatings})</p>
                                                </div>
                                                <span>{shop.address}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </aside>
                            <Map onShopHover={mapHoverHandler} userLocation={userLocation} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};