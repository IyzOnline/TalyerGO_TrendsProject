import React, { useState } from "react";

export const LogIn = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

        const handleLogin = async () => {
            if (!usernameOrEmail || !password) {
                setMessage("Please enter both fields.");
                return;
            }

            try {
                const condition = `(username='${usernameOrEmail}' OR email='${usernameOrEmail}') AND password='${password}'`;

                const res = await fetch("http://127.0.0.1:5000/select", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        table: "users",
                        columns: ["id", "username", "email", "type"],
                        condition
                    })
                });

                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    const user = data[0];
                    sessionStorage.setItem("id", user.id);
                    sessionStorage.setItem("username", user.username);
                    sessionStorage.setItem("email", user.email);
                    sessionStorage.setItem("type", user.type);
                    setMessage("Login successful.");
                    window.location.href = "/shops";
                } else {
                    setMessage("Invalid credentials.");
                }
            } catch (err) {
                console.error(err);
                setMessage("Error connecting to server.");
            }
        };

    return (
        <section>
            <div className="container">
                <div className="LS-wrapper | padding-block-80">
                    <div className="LS-bg-container | bg-container-filter-blue"></div>
                    <div className="LS-content-wrapper">
                        <div className="LS-logo-wrapper">
                            <p className="logo-large">Talyer<span className="clr-accent-300">Go</span></p>
                            <p>Naga City's Mechanic Shop</p>
                            <p>Information Center</p>
                        </div>
                        <div className="LS-box-wrapper">
                            <h1>Log In</h1>
                            <input
                                type="text"
                                placeholder="Username / Email"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="submit-wrapper">
                                <button className="LS-submit" onClick={handleLogin}>
                                    LOG IN
                                </button>
                                <div className="bottom-options">
                                    <p>Forgot Password</p>
                                    <p>Sign Up</p>
                                </div>
                                {message && (
                                    <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
