import { Link } from "react-router-dom";
import cbros from "../images/cbros.png"

export const Shops = () => {
   return (
    <main>
        <div className="container">

            <div className="shops-wrapper">
                
                <section className="shops-heading-wrapper | h1-container container padding-block-80">
                    <div class="shops-bg-container | bg-container-filter-blue"></div>
                    <h1 className="main-headings">Local Repair Shops</h1>
                    <div className="shops-profile-search">
                        <input type="text" className="shops-search-bar | margin-block-32" placeholder="Search for repair shop here"/>
                    </div>
                </section>

                <section className="shops-profile-section | container padding-block-80">
                    <div className="shops-profilie-wrapper">
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>C-Bros Genuine Autoparts & Accessories, Inc</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt="image"/>
                            <h3>CARniguan Auto Services</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>Fullyfix Auto Service</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>JL Habana Tire Supply & Auto Repair Shop</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>C-Bros Genuine Autoparts & Accessories, Inc</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt="image"/>
                            <h3>CARniguan Auto Services</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>Fullyfix Auto Service</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>JL Habana Tire Supply & Auto Repair Shop</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>C-Bros Genuine Autoparts & Accessories, Inc</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt="image"/>
                            <h3>CARniguan Auto Services</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>Fullyfix Auto Service</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                        <div className="shops-profile">
                            <img src={cbros} alt=""/>
                            <h3>JL Habana Tire Supply & Auto Repair Shop</h3>
                            <p>Diversion Road Barangay, Naga, 4400 Camarines Sur</p>
                        </div>
                    </div>
                </section>
                
            </div>

        </div>
    </main>
   ); 
}