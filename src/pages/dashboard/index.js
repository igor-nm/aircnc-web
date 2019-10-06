import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import websocket from "socket.io-client";
import { useEffect, useState, useMemo } from "react";

// Services import
import api from "./../../services/api";

export default function Dashboard()
{
    const [spots, setSpots] = useState([]);
    const [bookings, setBookings] = useState([]);

    const user_id = localStorage.getItem("user");
    const ws = useMemo(() => websocket("http://192.168.0.9:3333", { query: { user_id }}), [user_id]);

    useEffect(() => {        
        ws.on("booking_request", booking =>
        {
            setBookings([...bookings, booking]);
        });
    }, [bookings, ws]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem("user");
            const { data } = await api.get("/dashboard", {
                headers: { user_id }
            });
                      
            setSpots(data);           
        }

        loadSpots();
    }, []);

    async function handleAccept(id)
    {
        await api.post(`/bookings/${id}/approvals`);
        setBookings(bookings.filter(booking => booking._id !== id));
    }

    async function handleReject(id)
    {
        await api.post(`/bookings/${id}/rejections`);
        setBookings(bookings.filter(booking => booking._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                { bookings.map(booking => (
                    <li key={booking._id}>
                        <p>
                            <strong>{booking.user.email}</strong> is requesting a book on <strong>{booking.spot.company}</strong> to date: <strong>{booking.date}</strong>
                        </p>
                        <button onClick={() => handleAccept(booking._id)} className="accept">ACEITAR</button>
                        <button onClick={() => handleReject(booking._id)} className="reject">REJEITAR</button>
                    </li>
                )) }
            </ul>

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