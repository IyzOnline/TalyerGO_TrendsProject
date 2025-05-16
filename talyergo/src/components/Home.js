import { Link, useNavigate } from "react-router-dom";
import { Map } from "./Map";
import { useRef } from "react";
import { useShops } from "./ShopsContext";
import { StarEmpty } from "../svgs/StarEmpty";
import { StarFilled } from "../svgs/StarFilled";
import { StarHalf } from "../svgs/StarHalf";

export const Home = () => {
    const shops = useShops();
    const mapHoverHandler = useRef(null);
    const changeToPath = useNavigate();
    
    const navigation = (path) => {
        changeToPath(path);
    };

    const handleMouseEnter = (lat, lng, zoom) => {
        if (mapHoverHandler.current) {
            mapHoverHandler.current(lat, lng, zoom);
        }
    };

    return (
        <main>
            <section>
                    <div className="h1-container container padding-block-80">
                            <div class="hero-bg-container"></div>
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
                        <div class="btn-map-wrapper">
                            <button><Link>Find from my location</Link></button>
                            <button><Link>Sort By</Link></button>
                        </div>
                        <div class="search-wrapper">

                            <aside class="results-wrapper">
                                {shops.map((shop) => {
                                    return (
                                    <div key={shop.name} className="results-shops" 
                                    onMouseEnter={() => handleMouseEnter(shop.lat, shop.lng, 16)}
                                    onClick={() => navigation(shop.path)}>
                                        <h3>{shop.name}</h3>
                                        <div className="ratings-wrapper">
                                            <p>4.5</p>
                                            <div className="star-wrapper">
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarHalf/>
                                            </div>
                                            <p>(399)</p>    
                                        </div> 
                                        <span>{shop.address}</span>
                                    </div>
                                    );
                                })}
                                
                            </aside>

                            <Map onShopHover={mapHoverHandler}/>
                            
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}