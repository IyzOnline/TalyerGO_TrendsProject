import React, { useEffect, useRef, useCallback } from 'react'; // Import useCallback
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import "../App.css";
import orangemarker from '../images/orangemarker.png';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useShops } from './ShopsContext'; // Import useShops

export const Map = ({ onShopHover, userLocation }) => {
    const userMarkerRef = useRef(null);

    const { shops } = useShops(); // Correctly get the shops array

    const mapReference = useRef(null);
    const mapInstance = useRef(null);
    const changeToPath = useNavigate();

    // Wrap navigation in useCallback
    const navigation = useCallback((path) => {
        changeToPath(path);
    }, [changeToPath]); // Dependency: changeToPath is stable from useNavigate

    useEffect(() => {
        if (!mapReference.current) return;

        // Initialize map only once
        if (!mapInstance.current) {
            const minZoom = 14;
            const maxZoom = 17;

            // 'bounds' variable removed as it's not used to configure the map
            // If you want to use it, add maxBounds: bounds to L.map options

            const map = L.map(mapReference.current, {
                minZoom,
                maxZoom,
            }).setView([13.629, 123.185], 12);

            mapInstance.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                minZoom,
                maxZoom,
            }).addTo(map);

            const zoomToShop = (lat, lng, zoom) => {
                map.setView([lat, lng], zoom);
            };
            onShopHover.current = zoomToShop;

            // Cleanup function for initial map setup
            return () => {
                if (mapInstance.current) { // Ensure map exists before removing
                    mapInstance.current.remove();
                    mapInstance.current = null; // Clear map instance on unmount
                }
            };
        }
    }, [onShopHover]); // Only run this effect once for map initialization

    // Effect for adding/updating shop markers
    useEffect(() => {
        const map = mapInstance.current;
        if (!map || !Array.isArray(shops) || shops.length === 0) {
            // Clear existing shop markers if shops data changes or is empty
            if (map && map.shopMarkers) {
                map.removeLayer(map.shopMarkers);
                map.shopMarkers = null;
            }
            return;
        }

        // Clear previous shop markers before adding new ones
        if (map.shopMarkers) {
            map.removeLayer(map.shopMarkers);
        }
        const shopMarkersLayerGroup = L.layerGroup().addTo(map);
        map.shopMarkers = shopMarkersLayerGroup; // Store the layer group on the map instance

        shops.forEach((shop) => {
            const markerIcon = L.divIcon({
                className: 'map-marker',
                html: `<div class="marker-content leaflet-marker-icon leaflet-zoom-animated leaflet-interactive">
                            <p class="marker-text">${shop.name}</p>
                            <img class="orangemarker" src="${orangemarker}" alt="${shop.name} icon" />
                        </div>`,
                iconAnchor: [165, 60],
                popUpAnchor: [0, -50],
            });

            const shopMarker = L.marker([shop.lat, shop.lng], { icon: markerIcon }).addTo(shopMarkersLayerGroup);

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

            // Use the memoized navigation function
            popUpContent.addEventListener('click', () => {
                navigation(shop.path);
            });

            shopMarker.bindPopup(popUpContent, { offset: [0, -50] });
        });

        const updateMarkerVisibility = () => {
            const currentZoom = map.getZoom();
            shopMarkersLayerGroup.eachLayer(function (marker) {
                const markerContent = marker._icon?.querySelector('.marker-content');
                if (markerContent) {
                    markerContent.classList.toggle('show-text', currentZoom >= 16);
                }
            });
        };

        updateMarkerVisibility();
        map.on('zoomend', updateMarkerVisibility);

        // Cleanup for shop markers and zoomend listener
        return () => {
            if (map.shopMarkers) {
                map.removeLayer(map.shopMarkers);
                map.shopMarkers = null;
            }
            map.off('zoomend', updateMarkerVisibility);
        };

    }, [shops, navigation]); // Add navigation to dependencies as it's used in this effect

    // Effect for user location marker
    useEffect(() => {
        const map = mapInstance.current;
        if (!map || !userLocation) return;

        if (userMarkerRef.current) {
            map.removeLayer(userMarkerRef.current);
        }

        const userMarker = L.marker([userLocation.lat, userLocation.lng], {
            title: "Your Location",
        }).addTo(map);

        userMarkerRef.current = userMarker;
        map.setView([userLocation.lat, userLocation.lng], 16);
    }, [userLocation]);

    return (
        <div ref={mapReference} style={{ width: '1110px', height: '500px'}}/>
    );
};