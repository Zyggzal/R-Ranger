import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <div>
                <header>
                    <Navbar />
                </header>
            </div>
            <div>
                Main
                <hr />
                <Outlet />
                <hr />
            </div>
            <div>
                footer
            </div>
        </div>
    );
}

export default MainLayout;