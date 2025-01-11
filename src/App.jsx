import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from "./components/Header/Header.jsx";
import { About } from "./sections/About/About.jsx";
import { Menu } from "./components/Menu/Menu.jsx";
import { Girls } from "./sections/Girls/Girls.jsx";
import { Info } from "./sections/Info/Info.jsx";
import { Show } from "./sections/Show/Show.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
// import { MoreInfo } from "./sections/MoreInfo/MoreInfo.jsx";
import { Gift } from "./pages/Gift/Gift.jsx";
import { Jobs } from "./pages/Jobs/Jobs.jsx";
import { LanguageMenu } from "./components/LanguageMenu/LanguageMenu.jsx";
import { JobsModal } from "./components/JobsModal/JobsModal.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";

import Taxi from "./assets/icons/taxi.svg";
import TaxiHover from "./assets/icons/taxi-hover.svg";
import Chat from "./assets/icons/chat.svg";
import ChatHover from "./assets/icons/chat-hover.svg";

import { useState } from "react";

import './App.css'
import { TAXI } from "./utils/constants.js";

function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const [isTaxiHover, setIsTaxiHover] = useState(false);
    const handleMouseEnterTaxi = () => setIsTaxiHover(true);
    const handleMouseLeaveTaxi = () => setIsTaxiHover(false);
    const getTaxiIcon = () => {
        return isTaxiHover ? TaxiHover : Taxi;
    };

    const [isChatHover, setIsChatHover] = useState(false);
    const handleMouseEnterChat = () => setIsChatHover(true);
    const handleMouseLeaveChat = () => setIsChatHover(false);
    const getChatIcon = () => {
        return isChatHover ? ChatHover : Chat;
    };

    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleShowMenu = (newState) => {
        setShowMenu(newState);

        setShowLanguageMenu(false);
    };

    const handleShowLanguageMenu = (newState) => {
        setShowLanguageMenu(newState);

        setShowMenu(false);
    };

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
                        <About/>
                        <Girls/>
                        <Info/>
                        <Show/>
                        <Footer/>
                        {/*<MoreInfo />*/}
                    </>
                }/>
                <Route path="/gift" element={<Gift/>}/>
                <Route path="/jobs" element={<Jobs onOpenModal={() => setIsJobsModalOpen(true)}/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <div className="floating-buttons">
                <div className="floating-button" onClick={() => window.open(TAXI, '_blank')}>
                    <img
                        src={getTaxiIcon()}
                        alt="Taxi"
                        onMouseEnter={handleMouseEnterTaxi}
                        onMouseLeave={handleMouseLeaveTaxi}
                    />
                    <span className="floating-button__text">Такси</span>
                </div>
                <div className="floating-button" onClick={() => setIsSidebarOpen(true)}>
                    <img
                        src={getChatIcon()}
                        alt="Chat"
                        onMouseEnter={handleMouseEnterChat}
                        onMouseLeave={handleMouseLeaveChat}
                    />
                    <span className="floating-button__text">Чат</span>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <JobsModal isOpen={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)}/>
        </div>
    )
}

export default App
