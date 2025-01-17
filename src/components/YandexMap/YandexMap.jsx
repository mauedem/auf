import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { useRef } from "react";

export const YandexMap = () => {
    const mapRef = useRef(null);
    const placemarkCoordinates = [55.763322, 37.561778];

    const mapState = {
        center: placemarkCoordinates,
        zoom: 15,
        controls: [],
    };

    return (
        <YMaps query={{ apikey: '1485297f-c779-4550-a9c6-f8a8d7174e27', ns: 'use-load-option', lang: 'ru_RU' }}>
            <div style={{ width: '560px', height: '400px' }}>
                <Map
                    defaultState={mapState}
                    style={{ width: '100%', height: '100%' }}
                    options={{
                        // mapType: 'yandex#dark',
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                        // theme: 'dark',
                        mapType: 'yandex#map',
                        theme: 'dark',
                    }}
                    instanceRef={(ref) => {
                        mapRef.current = ref;
                    }}
                >
                    <Placemark
                        geometry={placemarkCoordinates}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref:
                                'https://static.tildacdn.com/tild6237-3332-4436-b733-636138666635/marker.svg',
                            iconImageSize: [66, 56],
                            iconImageOffset: [-33, -28],
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
