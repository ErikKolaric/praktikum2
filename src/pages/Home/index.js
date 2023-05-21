import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    return(
        <div className="flex justify-between">
            <div>
                <input placeholder="Search barbers" className="w-400" />
            </div>
            <button className="outlined-btn my-1" onClick={() => navigate("/apply-barber")}>Apply Barber</button>
        </div>
    )
}

export default Home;
