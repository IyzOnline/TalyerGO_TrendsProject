import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <main>
            <section>
                <div className="hero-container | container padding-block-80">
                    <div className="hero-wrapper">
                        <h1 className="main-headings">Find the Best Mechanics<br></br>for your situation</h1>
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
                                <div>
                                    <h3>Poggers</h3>
                                    {/* <img /> */}
                                    <p>San Mateo St., Barangay Pacol</p>
                                </div>
                                <hr/>
                                <div>
                                    <h3>Poggers</h3>
                                    {/* <img /> */}
                                    <p>San Mateo St., Barangay Pacol</p>
                                </div>
                                <hr/>
                                <div>
                                    <h3>Poggers</h3>
                                    {/* <img /> */}
                                    <p>San Mateo St., Barangay Pacol</p>
                                </div>
                                <hr/>
                                <div>
                                    <h3>Poggers</h3>
                                    {/* <img /> */}
                                    <p>San Mateo St., Barangay Pacol</p>
                                </div>
                                <hr/>
                                <div>
                                    <h3>Poggers</h3>
                                    {/* <img /> */}
                                    <p>San Mateo St., Barangay Pacol</p>
                                </div>
                                <hr/>
                            </aside> 
                            {/* insert map here */}
                            <button class="temp-map">Temp Element</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}