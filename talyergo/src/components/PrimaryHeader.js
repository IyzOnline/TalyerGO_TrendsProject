import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const PrimaryHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('id'));

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoggedIn(!!sessionStorage.getItem('id'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            <div className="container | padding-block-32">
                <div className="primary-header-wrapper">
                    <p className="logo"><Link to="/">TalyerGo</Link></p>
                    <nav>
                        <ul className="ph-nav" aria-label="Primary Navigation"> 
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/shops">Shops</Link></li>
                            {isLoggedIn && sessionStorage.getItem('type') === '1' && (
                                <li><Link to="/my-shop">My Shop</Link></li>
                            )}
                        </ul>
                    </nav>
                    <div className="ph-buttons">
                        {!isLoggedIn ? (
                            <>
                                <button><Link to="/sign-up">Sign up</Link></button>
                                <button><Link to="/log-in">Log in</Link></button>
                            </>
                        ) : (
                            <button className="logout-btn"><Link to="/logout">Logout</Link></button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}