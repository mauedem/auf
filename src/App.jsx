import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header.jsx";
import { About } from "./sections/About/About.jsx";
import { Menu } from "./components/Menu/Menu.jsx";
import { Girls } from "./sections/Girls/Girls.jsx";
import { Info } from "./sections/Info/Info.jsx";
import { Show } from "./sections/Show/Show.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Gift } from "./pages/Gift/Gift.jsx";
import { Jobs } from "./pages/Jobs/Jobs.jsx";
import { LanguageMenu } from "./components/LanguageMenu/LanguageMenu.jsx";
import { JobsModal } from "./components/JobsModal/JobsModal.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { MoreInfoModal } from "./components/MoreInfoModal/MoreInfoModal.jsx";
import { InteriorModal } from "./components/InteriorModal/InteriorModal.jsx";

import Taxi from "../public/assets/icons/taxi-3.svg";
// import TaxiHover from "../public/assets/icons/taxi-hover.svg";
// import Chat from "../public/assets/icons/chat.svg";
// import ChatHover from "../public/assets/icons/chat-hover.svg";

import Bar1 from "../public/assets/images/bar/1.png";
import Bar2 from "../public/assets/images/bar/2.png";
import Bar3 from "../public/assets/images/bar/3.png";

import Entrance1 from "../public/assets/images/entrance/1.png";
import Entrance2 from "../public/assets/images/entrance/2.png";
import Entrance3 from "../public/assets/images/entrance/3.png";

import Hall1 from "../public/assets/images/hall/1.png";
import Hall2 from "../public/assets/images/hall/2.png";
import Hall3 from "../public/assets/images/hall/3.png";
import Hall4 from "../public/assets/images/hall/4.png";
import Hall5 from "../public/assets/images/hall/5.png";
import Hall6 from "../public/assets/images/hall/6.png";

import Seats1 from "../public/assets/images/seats/1.png";
import Seats2 from "../public/assets/images/seats/2.png";
import Seats3 from "../public/assets/images/seats/3.png";
import Seats4 from "../public/assets/images/seats/4.png";

import Vip1 from "../public/assets/images/vip/1.png";
import Vip2 from "../public/assets/images/vip/2.png";
import Vip3 from "../public/assets/images/vip/3.png";
import Vip4 from "../public/assets/images/vip/4.png";
import Vip5 from "../public/assets/images/vip/5.png";

import { INTERIOR_ITEMS, TAXI } from "./utils/constants.js";

import './App.css'

const photoGroups = {
    bar: [Bar1, Bar2, Bar3],
    entrance: [Entrance1, Entrance2, Entrance3],
    hall: [Hall1, Hall2, Hall3, Hall4, Hall5, Hall6],
    seats: [Seats1, Seats2, Seats3, Seats4],
    vip: [Vip1, Vip2, Vip3, Vip4, Vip5],
};

function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const [isScrolling, setIsScrolling] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // const [isTaxiHover, setIsTaxiHover] = useState(false);
    // const handleMouseEnterTaxi = () => setIsTaxiHover(true);
    // const handleMouseLeaveTaxi = () => setIsTaxiHover(false);
    // const getTaxiIcon = () => {
    //     return isTaxiHover ? TaxiHover : Taxi;
    // };
    //
    // const [isChatHover, setIsChatHover] = useState(false);
    // const handleMouseEnterChat = () => setIsChatHover(true);
    // const handleMouseLeaveChat = () => setIsChatHover(false);
    // const getChatIcon = () => {
    //     return isChatHover ? ChatHover : Chat;
    // };

    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
    const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
    const [isInteriorModalOpen, setIsInteriorModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleShowMenu = (newState) => {
        setShowMenu(newState);

        setShowLanguageMenu(false);
    };

    const handleShowLanguageMenu = (newState) => {
        setShowLanguageMenu(newState);

        setShowMenu(false);
    };

    const [currentPhotos, setCurrentPhotos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});

    const handleOpenInteriorModal = (photosKey) => {
        setCurrentPhotos(photoGroups[photosKey] || []);
        setSelectedCategory(INTERIOR_ITEMS.find(item => item.photos === photosKey))
        setIsInteriorModalOpen(true);
    };

    const handleCategoryChange = (newCategory) => {
        setCurrentPhotos(photoGroups[newCategory.photos] || []);
        setSelectedCategory(newCategory)
    }

    useEffect(() => {
        if (isMoreInfoModalOpen || isInteriorModalOpen) {
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }
    }, [isMoreInfoModalOpen, isInteriorModalOpen]);

    return (
        <div className="App">
            <Menu showMenu={showMenu} onMenuChange={handleShowMenu}/>
            <LanguageMenu showLanguageMenu={showLanguageMenu} onLanguageMenuChange={handleShowLanguageMenu}/>
            <Header
                showMenu={showMenu}
                showLanguageMenu={showLanguageMenu}
                onMenuChange={handleShowMenu}
                onLanguageMenuChange={handleShowLanguageMenu}
            />

            <Routes>
                <Route path="/" element={
                    <>
                        <About />
                        <Girls />
                        <Info />
                        <Show onInteriorClick={handleOpenInteriorModal} />
                        <Footer onMoreInfoClick={() => setIsMoreInfoModalOpen(true)} />
                    </>
                }/>
                <Route path="/gift" element={<Gift/>}/>
                <Route path="/jobs" element={<Jobs onOpenModal={() => setIsJobsModalOpen(true)}/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <div
                className={`floating-buttons ${
                    isScrolling ? "floating-buttons--visible" : ""
                }`}
            >
                <div className="floating-button" onClick={() => window.open(TAXI, '_blank')}>
                    <img src={Taxi} alt="Taxi" />
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <MoreInfoModal isOpen={isMoreInfoModalOpen} onClose={() => setIsMoreInfoModalOpen(false)} />

            <InteriorModal
                photos={currentPhotos}
                selectedCategory={selectedCategory}
                isOpen={isInteriorModalOpen}
                onCategoryChange={handleCategoryChange}
                onClose={() => setIsInteriorModalOpen(false)}
            />

            <JobsModal isOpen={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} />
        </div>
    )
}

export default App
