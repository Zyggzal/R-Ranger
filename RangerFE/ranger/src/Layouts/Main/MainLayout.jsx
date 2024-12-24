import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import './MainLayout.css'
import ArrowDownIcon from "../../Components/Icons/ArrowDownIcon/ArrowDownIcon";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [showUppie, setShowUppie] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setShowUppie(window.scrollY > 300)
            );
        }
    }, []);

    return (
        <div>
            <header id="header">
                <Navbar />
            </header>
            <main>
                <Outlet />
                { showUppie && <a className="uppies" href="#header"><ArrowDownIcon rotate={180}/></a> }
            </main>
            <footer className="footer">
                &copy; 2024 Slipokurov Valerii & Voloshyn Olexii
            </footer>  
        </div>
    );
}

export default MainLayout;