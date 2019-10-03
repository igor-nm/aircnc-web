import React from "react";
import { useState } from "react";
import api from "./../../services/api";

export default function Login({ history })
{
    const [email, setEmail] = useState("");
  
    async function handleSubmit(event) 
    {
        event.preventDefault();
        
        const { data } = await api.post("/sessions", { email });
        localStorage.setItem("user", data._id);
        history.push("/dashboard");
    }

    return (
        <>
            <p>
                Provide <strong>spots</strong> to programers and find <strong>talents</strong> to your company.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Provide your e-mail here"
                    onChange={event => setEmail(event.target.value)}
                />

                <button className="btn" type="submit">
                    Login
                </button>
            </form>
        </>
    );
}