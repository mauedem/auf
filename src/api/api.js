import axios from 'axios';
import API_URLS from "./api-urls.js";

const api = axios.create({
    baseURL: '/api',
});

const ApiService = {
    fetchAbout: async () => {
        const response = await api.get(API_URLS.ABOUT);
        return response.data;
    },

    fetchContacts: async () => {
        const response = await api.get(API_URLS.CONTACTS);
        return response.data;
    },

    fetchGastronomy: async () => {
        const response = await api.get(API_URLS.GASTRONOMY);
        return response.data;
    },

    fetchGift: async () => {
        const response = await api.get(API_URLS.GIFT);
        return response.data;
    },

    fetchGiftCards: async () => {
        const response = await api.get(API_URLS.GIFT_CARDS);
        return response.data;
    },

    fetchGirls: async () => {
        const response = await api.get(API_URLS.GIRLS);
        return response.data;
    },

    fetchInfo: async () => {
        const response = await api.get(API_URLS.INFO);
        return response.data;
    },

    fetchInterior: async () => {
        const response = await api.get(API_URLS.INTERIOR);
        return response.data;
    },

    fetchInteriorBlocks: async () => {
        const response = await api.get(API_URLS.INTERIOR_BLOCKS);
        return response.data;
    },

    fetchJobs: async () => {
        const response = await api.get(API_URLS.JOBS);
        return response.data;
    },

    fetchVacancies: async () => {
        const response = await api.get(API_URLS.VACANCIES);
        return response.data;
    },

    fetchShow: async () => {
        const response = await api.get(API_URLS.SHOW);
        return response.data;
    },

    fetchMenu: async () => {
        const response = await api.get(API_URLS.MENU);
        return response.data;
    },

    fetchNav: async () => {
        const response = await api.get(API_URLS.NAV);
        return response.data;
    },

    fetchMoreInfo: async () => {
        const response = await api.get(API_URLS.MORE_INFO);
        return response.data;
    },
};

export default ApiService;
