import { Link } from "react-router-dom";

export const PrimaryHeader = () => {
    return (
        <header>
            <div className="container | padding-block-32">
                <div className="primary-header-wrapper">
                    <p className="logo"><Link to="/">TalyerGo</Link></p>
                    <nav>
                        <ul className="ph-nav" aria-label="Primary Navigation"> 
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/shops">Shops</Link></li>
                        </ul>
                    </nav>
                    <div className="ph-buttons">
                        <button><Link to="/sign-up">Sign up</Link></button>
                        <button><Link to="/log-in">Log in</Link></button>
                    </div>
                </div>
            </div>
        </header>
    );
}