export const SignUp = () => {
    return (
        <section>
            <div className="container">
                <div className="LS-wrapper | padding-block-80">
                    <div class="LS-bg-container | bg-container-filter-blue"></div>
                    <div className="LS-content-wrapper">
                        <div className="LS-logo-wrapper">
                            <p className="logo-large">Talyer<span className="clr-accent-300">Go</span></p>
                            <p>Naga City's Mechanic Shop</p>
                            <p>Information Center</p>
                        </div>
                        <div className="LS-box-wrapper">
                            <h1>Sign Up</h1>
                            <input type="text" placeholder="Username"/>
                            <input type="text" placeholder="Email"/>
                            <input type="password" placeholder="Password"/>
                            <input type="password" placeholder="Repeat Password"/>
                            <div className="submit-wrapper">
                                <button className="LS-submit">SIGN UP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}