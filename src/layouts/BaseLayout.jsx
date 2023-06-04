import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar"

function BaseLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default BaseLayout;