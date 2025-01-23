import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { useMemo, useRef } from "react";
import { MAP_API_KEY } from "../../utils/constants.js";
import { useLanguage } from "../../context/LanguageProvider.jsx";

import './YandexMap.css'

export const YandexMap = () => {
    const mapRef = useRef(null);
    const placemarkCoordinates = [55.762277, 37.569899];

    const mapState = {
        center: placemarkCoordinates,
        zoom: 15,
        controls: [],
    };

    const { language } = useLanguage();

    const getLanguage = useMemo(() => {
        switch (language) {
            case 'en':
                return 'en_US';
            case 'ar':
                return 'ar_AE';
            case 'zh':
                return 'zh_CN';
            default:
                return 'ru_RU';
        }
    }, [language]);

    return (
        <YMaps query={{ apikey: MAP_API_KEY, ns: 'use-load-option', lang: getLanguage }}>
            <div>
                <Map
                    className="yandex-map"
                    defaultState={mapState}
                    options={{
                        mapType: 'yandex#dark',
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                        theme: 'dark',
                        behaviors: [],
                    }}
                    instanceRef={(ref) => {
                        mapRef.current = ref;
                    }}
                >
                    <Placemark
                        geometry={placemarkCoordinates}
                        options={{
                            preset: 'islands#darkOrangeDotIcon',
                            iconColor: '#2ED924',
                        }}
                        properties={{
                            hintContent: 'г. Москва, ул. Красная Пресня, 24',
                            balloonContent: 'Точка назначения',
                        }}
                    />
                    <ZoomControl options={{ size: 'small', float: 'right' }} />
                </Map>
            </div>
        </YMaps>
    );
};
