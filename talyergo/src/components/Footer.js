import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-wrapper padding-block-80">
                    <div className="company-section">
                        <p className="logo">TalyerGo</p>
                        <p className="cs-description">Where solutions come easy.</p>
                    </div>
                    <div className="nav-contact-section">
                        <div>
                            <h3 class="footer-headings">Navigation</h3>
                            <nav> 
                                <ul className="footer-column-items">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/shops">Shops</Link></li>
                                </ul>
                            </nav>
                        </div>

                        <div>
                            <h3 class="footer-headings">Contact Information</h3>
                            <ul className="footer-column-items"> 
                                <li>talyergo@gmail.com</li>
                                <li>+63-9692499027</li>
                                <li>Carolina, Naga City.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="footer-headings">Social Media</h3>
                            <nav>
                                <ul className="footer-column-items">
                                    <li><Link to="/">Facebook</Link></li>
                                    <li><Link to="/">Instagram</Link></li>
                                    <li><Link to="/">Twitter</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}