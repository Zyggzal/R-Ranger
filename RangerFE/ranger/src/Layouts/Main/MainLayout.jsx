import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import './MainLayout.css'
import ArrowDownIcon from "../../Components/Icons/ArrowDownIcon/ArrowDownIcon";

const MainLayout = () => {
    return (
        <div>
            <header id="header">
                <Navbar />
            </header>
            <main>
                <Outlet />
                <a className="uppies" href="#header"><ArrowDownIcon rotate={180}/></a>
            </main>
            <footer className="footer">
                footer
            </footer>  
        </div>
    );
}

export default MainLayout;