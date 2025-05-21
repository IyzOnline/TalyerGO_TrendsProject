import { useState, useEffect } from "react";
import { StarEmpty } from "../svgs/StarEmpty";
import { StarFilled } from "../svgs/StarFilled";
import { StarHalf } from "../svgs/StarHalf";
import { useShops } from './ShopsContext'; 
import { Link } from "react-router-dom";

export const Shops = () => {

    const { shops: shopsFromContext } = useShops(); 

    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (Array.isArray(shopsFromContext)) {
            setShops(shopsFromContext);
        }
    }, [shopsFromContext]);


    const filteredShops = Array.isArray(shops)
        ? shops.filter(shop =>
              shop.name.toLowerCase().includes(search.toLowerCase())
          )
        : [];

    const sessionUserId = sessionStorage.getItem("id");

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

            // Update local state so UI updates immediately
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
                    onClick={() => handleRatingClick(shop, String(i))}
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
            <div className="container">
                <div className="shops-wrapper">
                    <section className="shops-heading-wrapper | h1-container container padding-block-80">
                        <div className="shops-bg-container | bg-container-filter-blue"></div>
                        <h1 className="main-headings">Local Repair Shops</h1>
                        <div className="shops-profile-search">
                            <input
                                type="text"
                                className="shops-search-bar | margin-block-32"
                                placeholder="Search for repair shop here"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </section>

                    <section className="shops-profile-section | container padding-block-80">
                        <div className="shops-profilie-wrapper">
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
                                        <div key={shop.id} className="shops-profile"> {/* Changed key to shop.id for better practice */}
                                            <Link to={shop.path}>
                                                <img src={shop.image} alt={shop.name}/>
                                            </Link>
                                            <h3>{shop.name}</h3>
                                            <div className="ratings-wrapper">
                                                <p>{averageRating.toFixed(1)}</p>
                                                <div className="star-wrapper">
                                                    {renderStars(averageRating, shop)}
                                                </div>
                                                <p>({totalRatings})</p>
                                            </div>
                                            <p>{shop.address}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}