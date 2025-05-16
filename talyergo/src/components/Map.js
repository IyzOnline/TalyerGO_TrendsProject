import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import "../App.css"
import orangemarker from '../images/orangemarker.png';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useShops } from './ShopsContext';

export const Map = () => {
    const shops = useShops();
    const mapReference = useRef(null);
    const changeToPath = useNavigate();

    const navigation = (path) => {
        changeToPath(path);
    };

    useEffect(() => {
        if(!mapReference.current) return;

        const minZoom = 14;
        const maxZoom = 17;
        
        const bounds = L.latLngBounds(
            [13.55, 123.15],
            [13.68, 123.22]
        );

        const map = L.map(mapReference.current, {
            minZoom: minZoom,
            maxZoom: maxZoom,
            maxBounds: bounds,
            maxBoundsViscosity: 0.7
        }).setView([13.629, 123.185], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: minZoom,
            maxZoom: maxZoom
        }).addTo(map);

        const markers = [];

        shops.forEach(shop => {

            const markerIcon = L.divIcon({
                className: 'map-marker',
                html: `<div class="marker-content leaflet-marker-icon leaflet-zoom-animated leaflet-interactive">
                            <p class="marker-text">${shop.name}</p>   
                            <img class="orangemarker" src="${orangemarker}" alt="${shop.name} icon" />
                        </div>`,
                iconAnchor: [165, 60],
                popUpAnchor: [0, -50]
            });
            
            // const tempMarker = L.marker([shop.lat, shop.lng]).addTo(map);
            const shopMarker = L.marker([shop.lat, shop.lng], {icon : markerIcon}).addTo(map)
            markers.push(shopMarker);
            
            const popUpContent = document.createElement('div');
            popUpContent.classList.add("pop-up-content");

            const popUpName = document.createElement('h2');
            popUpName.textContent = shop.name;

            const popUpImage = document.createElement('img');
            popUpImage.src = shop.image;
            popUpImage.alt = `${shop.name} appearance`;
            popUpImage.classList.add("shop-map-image");

            const popUpAddress = document.createElement('span');
            popUpAddress.textContent = shop.address;

            popUpContent.appendChild(popUpImage);
            popUpContent.appendChild(popUpName);
            popUpContent.appendChild(popUpAddress);

            popUpContent.addEventListener('click', () => {
                navigation(shop.path); 
            })
            
            // tempMarker.bindPopup(popUpContent, {offset: [0, -50]});
            shopMarker.bindPopup(popUpContent, {offset: [0, -50]});
        });

        const updateMarkerVisibility = () => {
            const currentZoom = map.getZoom();
            markers.forEach(marker => {
                const markerContent = marker._icon.querySelector('.marker-content');
                if (markerContent) {
                    if (currentZoom >= 16) {
                        markerContent.classList.add('show-text');
                    } else {
                        markerContent.classList.remove('show-text');
                    }
                }
            });
        };

        // Initial call
        updateMarkerVisibility();
        map.on('zoomend', updateMarkerVisibility);

        return () => {
            if(map){
                map.remove();
            }
        };

    }, [mapReference]);

    return <div ref={mapReference} style={{ width: '1110px', height: '500px'}}/>
}