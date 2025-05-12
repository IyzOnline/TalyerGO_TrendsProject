import { Link } from "react-router-dom";

export const PrimaryHeader = () => {
    return (
        <header>
            <div className="container">
                <div className="primary-header-wrapper">
                    <p><Link to="/">TalyerGo</Link></p>
                    <div>
                        <ul className="ph-nav" role="list"> 
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/">Shops</Link></li>
                        </ul>
                    </div>
                    <div className="ph-buttons">
                        <button><Link>Sign up</Link></button>
                        <button><Link>Log in</Link></button>
                    </div>
                </div>
            </div>
        </header>
    );
}