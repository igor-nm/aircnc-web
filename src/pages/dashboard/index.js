import "./styles.css";
import React from "react";
import api from "./../../services/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard()
{
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem("user");
            const { data } = await api.get("/dashboard", {
                headers: { user_id }
            });
            
            console.log(data);            
            setSpots(data);           
        }

        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/daily` : "FREE"}</span>
                    </li>
                ))}
            </ul>

            <Link to="/create-spot">
                <button className="btn">Create a new spot</button>
            </Link>
        </>
    )
}