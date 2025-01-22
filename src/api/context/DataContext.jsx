import { createContext, useState, useEffect } from 'react';
import ApiService from '../api.js';

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        aboutData: null,
        contactsData: null,
        gastronomyData: null,
        giftData: null,
        giftCardsData: null,
        girlsData: null,
        infoData: null,
        interiorData: null,
        interiorBlocksData: null,
        jobsData: null,
        vacancies: null,
        showData: null,
        menuItems: null,
        navItems: null,
        moreInfo: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    aboutData,
                    contactsData,
                    gastronomyData,
                    giftData,
                    giftCardsData,
                    girlsData,
                    infoData,
                    interiorData,
                    interiorBlocksData,
                    jobsData,
                    vacancies,
                    showData,
                    menuItems,
                    navItems,
                    moreInfo,
                ] = await Promise.all([
                    ApiService.fetchAbout(),
                    ApiService.fetchContacts(),
                    ApiService.fetchGastronomy(),
                    ApiService.fetchGift(),
                    ApiService.fetchGiftCards(),
                    ApiService.fetchGirls(),
                    ApiService.fetchInfo(),
                    ApiService.fetchInterior(),
                    ApiService.fetchInteriorBlocks(),
                    ApiService.fetchJobs(),
                    ApiService.fetchVacancies(),
                    ApiService.fetchShow(),
                    ApiService.fetchMenu(),
                    ApiService.fetchNav(),
                    ApiService.fetchMoreInfo(),
                ]);

                setData({
                    aboutData,
                    contactsData,
                    gastronomyData,
                    giftData,
                    giftCardsData,
                    girlsData,
                    infoData,
                    interiorData,
                    interiorBlocksData,
                    jobsData,
                    vacancies,
                    showData,
                    menuItems,
                    navItems,
                    moreInfo,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loading }}>
            {children}
        </DataContext.Provider>
    );
};
