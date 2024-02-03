import React from "react";
import DashBoardHome from "./pages/Admin/DashBoardHome";
import "../styles/Dashboar.css";
import { Link } from "react-router-dom";

function DashApp() {
    return (
        <div className="grid-container Dash">
            <DashBoardHome />
            <Link to={"/dashboard/admin"} className="mx-auto btn-success">
                <button className="btn p-2 btn-success mx-auto">
                    <span class="material-symbols-outlined">home</span>
                </button>
            </Link>
        </div>
    );
}

export default DashApp;
