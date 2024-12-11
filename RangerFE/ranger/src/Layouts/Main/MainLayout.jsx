import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                Main
                <hr />
                <Outlet />
                <hr />
            </main>
            <footer className="footer">
                footer
            </footer>
        </div>
    );
}

export default MainLayout;