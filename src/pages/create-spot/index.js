import "./styles.css";
import React from "react";
import api from "./../../services/api";
import { useState, useMemo } from "react";

import camera from "./../../assets/camera.svg";

export default function CreateSport({ history })
{
    const [price, setPrice] = useState("");
    const [techs, setTechs] = useState("");
    const [company, setCompany] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event)
    {
        event.preventDefault();
        const formData = new FormData();

        formData.append("price", price);
        formData.append("techs", techs);
        formData.append("company", company);
        formData.append("thumbnail", thumbnail);

        const user_id = localStorage.getItem("user");

        await api.post("/spots", formData, {
            headers: { user_id }
        });

        history.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                className={thumbnail ? "has-thumb" : ""}
                style={{ backgroundImage: `url(${preview})` }}
            >
                <img src={camera} alt="Select a img" />
                <input
                    type="file"
                    onChange={event => setThumbnail(event.target.files[0])}
                />
            </label>

            <label htmlFor="company">Company *</label>
            <input
                id="company"
                value={company}
                placeholder="Your amazing company"
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Technologies * <span>(splitted by comma)</span></label>
            <input
                id="techs"
                value={techs}
                placeholder="What technology do you use?"
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Daily Price <span>(don't fill to free)</span></label>
            <input
                id="price"
                value={price}
                placeholder="How much by day?"
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Register</button>
        </form>    
    )
}