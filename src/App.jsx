import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useMemo, useState } from "react";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import './App.css'

import { DataContext } from "./context/DataContext.jsx";
import { LANGUAGES } from "./utils/constants.js";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import { MenuModal } from "./components/MenuModal/MenuModal.jsx";

function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const [language, setLanguage] = useState(() => {
        const pathLanguage = location.pathname.split('/')[1];
        return LANGUAGES.includes(pathLanguage) ? pathLanguage : 'ru';
    });

    const navigate = useNavigate()

    useEffect(() => {
        const pathLanguage = location.pathname.split('/')[1];
        if (!LANGUAGES.includes(pathLanguage) && pathLanguage !== 'ru') {
            const newPath = language === 'ru' ? location.pathname : `/${language}${location.pathname}`;
            navigate(newPath, { replace: true });
        }
    }, [location.pathname, navigate, language]);

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (newLanguage === 'ru') {
            pathSegments.shift();
        } else if (!LANGUAGES.includes(pathSegments[0])) {
            pathSegments.unshift(newLanguage);
        } else {
            pathSegments[0] = newLanguage;
        }

        const newPath = `/${pathSegments.join('/')}`;
        navigate(newPath, { replace: true });
    };

    const { data, loading } = useContext(DataContext);

    const navItems = useMemo(() => data?.navItems || [], [data?.navItems]);
    const contactsData = useMemo(() => data?.contactsData?.[0] || {}, [data?.contactsData]);
    const interiorData = useMemo(() => data?.interiorData?.[0] || {}, [data?.interiorData]);
    const interiorBlocksData = useMemo(() => data?.interiorBlocksData || [], [data?.interiorBlocksData]);
    const jobsData = useMemo(() => data?.jobsData?.[0] || {}, [data?.jobsData]);
    const gastronomyData = useMemo(() => data?.gastronomyData?.[0] || {}, [data?.gastronomyData]);

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

    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
    const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [currentPdfFile, setCurrentPdfFile] = useState('');
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
        const photos = interiorBlocksData.find(item => item.key === photosKey)?.photos.map((photo) => {
            return `${API_BASE_URL}${photo.photo}`
        })

        setCurrentPhotos(photos || []);
        setSelectedCategory(interiorBlocksData.find(item => item.key === photosKey))
        setIsInteriorModalOpen(true);
    };

    const handleCategoryChange = (newCategory) => {
        const photos = interiorBlocksData.find(item => item.key === newCategory)?.photos.map((photo) => {
            return `${API_BASE_URL}${photo.photo}`
        })

        setCurrentPhotos(photos || []);
        setSelectedCategory(interiorBlocksData.find(item => item.key === newCategory))
    }

    const handleMenuClick = (pdfFile) => {
        setCurrentPdfFile(pdfFile)
        setIsMenuModalOpen(true)
    }

    useEffect(() => {
        const shouldDisableScroll = isMoreInfoModalOpen || isInteriorModalOpen || (window.innerWidth < 768 && showMenu);

        if (shouldDisableScroll) {
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }
    }, [isMoreInfoModalOpen, isInteriorModalOpen, showMenu]);

    return (
        <div className="App">
            <LanguageProvider>
                <Menu contactsData={contactsData} showMenu={showMenu} onMenuChange={handleShowMenu}/>
                <LanguageMenu
                    onLanguageChange={handleLanguageChange}
                    onLanguageMenuChange={handleShowLanguageMenu}
                    showLanguageMenu={showLanguageMenu}
                />
                <Header
                    loading={loading}
                    contactsData={contactsData}
                    onLanguageChange={handleLanguageChange}
                    navItemsData={navItems}
                    showMenu={showMenu}
                    showLanguageMenu={showLanguageMenu}
                    onMenuChange={handleShowMenu}
                    onLanguageMenuChange={handleShowLanguageMenu}
                />

                <Routes>
                    <Route path="/:lang?" element={
                        <>
                            <About contactsData={contactsData} navItemsData={navItems} onLanguageChange={handleLanguageChange} />
                            <Girls />
                            <Info />
                            <Show
                                onInteriorClick={handleOpenInteriorModal}
                                interiorData={interiorData}
                                interiorBlocksData={interiorBlocksData}
                            />
                            <Footer
                                contactsData={contactsData}
                                gastronomyData={gastronomyData}
                                onMoreInfoClick={() => setIsMoreInfoModalOpen(true)}
                                onMenuClick={handleMenuClick}
                            />
                        </>
                     }/>
                    <Route path="/gift/" element={<Gift />} />
                    <Route path="/jobs/" element={<Jobs jobsData={jobsData} onOpenModal={() => setIsJobsModalOpen(true)}/>} />
                    <Route path="/:lang/gift/" element={<Gift />} />
                    <Route path="/:lang/jobs/" element={<Jobs jobsData={jobsData} onOpenModal={() => setIsJobsModalOpen(true)}/>} />
                    <Route path="*" element={
                            location.pathname.startsWith('/admin')
                                ? null
                                : <Navigate to="/" replace/>
                        }/>
                </Routes>

                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <MoreInfoModal
                    isOpen={isMoreInfoModalOpen}
                    onClose={() => setIsMoreInfoModalOpen(false)}
                />

                <InteriorModal
                    photos={currentPhotos}
                    selectedCategory={selectedCategory}
                    isOpen={isInteriorModalOpen}
                    onCategoryChange={handleCategoryChange}
                    interiorData={interiorData}
                    interiorBlocksData={interiorBlocksData}
                    onClose={() => setIsInteriorModalOpen(false)}
                />

                <MenuModal
                    currentPdfFile={currentPdfFile}
                    gastronomyData={gastronomyData}
                    interiorData={interiorData}
                    isOpen={isMenuModalOpen}
                    onClose={() => setIsMenuModalOpen(false)}
                />

                <JobsModal
                    isOpen={isJobsModalOpen}
                    contactsData={contactsData}
                    jobsData={jobsData}
                    onClose={() => setIsJobsModalOpen(false)}
                />
            </LanguageProvider>

            <div
                className={`floating-buttons ${
                    isScrolling ? "floating-buttons--visible" : ""
                }`}
            >
                <div className="floating-button" onClick={() => window.open(contactsData['taxi_link'], '_blank')}>
                    <img src={Taxi} alt="Taxi" loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default App
