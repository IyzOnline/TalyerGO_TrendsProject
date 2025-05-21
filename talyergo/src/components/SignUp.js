import React, { useState } from "react";

export const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        type: "0" // default to user
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.repeatPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const res = await fetch("http://127.0.0.1:5000/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "users",
                    columns: ["username", "email", "password", "type"],
                    values: [form.username, form.email, form.password, form.type]
                })
            });
            const data = await res.json();
            if (
                data.error &&
                data.error.includes("Duplicate entry") &&
                data.error.includes("for key 'email'")
            ) {
                setMessage("This email is already registered.");
            } else {
                setMessage("Your account has been created." || data.error);
            }
        } catch (err) {
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
                            <p className="logo-large">
                                Talyer<span className="clr-accent-300">Go</span>
                            </p>
                            <p>Naga City's Mechanic Shop</p>
                            <p>Information Center</p>
                        </div>
                        <div className="LS-box-wrapper">
                            <h1>Sign Up</h1>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    placeholder="Repeat Password"
                                    value={form.repeatPassword}
                                    onChange={handleChange}
                                />
                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                >
                                    <option value="0">User</option>
                                    <option value="1">Shop Owner</option>
                                </select>
                                <div className="submit-wrapper">
                                    <button className="LS-submit" type="submit">SIGN UP</button>
                                </div>
                                {message && (
                                    <div style={{ color: "red", textAlign: "center" }}>
                                        {message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
