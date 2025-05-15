import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const shops = [
    { name: "Sam's Motor Shop", phone: "0948 949 9444", address: "Zone 4, Concepcion Grande, Naga City", lat: 13.621, lng: 123.183, path: '/profile'},
    { name: "PRANES Auto Repair Shop", address: "Dover Street, City Heights Subdivision, Naga City", lat: 13.622, lng: 123.193, path: '/profile'},
    { name: "St. Domingo Car Repair Shop", phone: "0918 944 8473", address: "Diversion Road, Naga City", lat: 13.625, lng: 123.205, path: '/profile'},
    { name: "JL Habana Tire Supply & Auto Repair Shop", phone: "0963 021 4623", address: "Phil-pan, Maharlika Highway, Naga City", lat: 13.619, lng: 123.181, path: '/profile'},
    { name: "F1 Alliance Car Care Center", phone: "0949 815 5188", address: "Dr 5 LF Bldg2, Naga City", lat: 13.628, lng: 123.195, path: '/profile'},
    { name: "Ongskie Auto Supply", phone: "(054) 473 2818", address: "Roxas Ave, Naga City", lat: 13.619, lng: 123.186, path: '/profile'},
    { name: "Lass Automotive Corporation", phone: "(054) 881 6488", address: "39, Naga City", lat: 13.620, lng: 123.190, path: '/profile'},
    { name: "Nosol Tire Supply", phone: "0908 896 8322", address: "Zone 1 Concepcion Grande, Naga City", lat: 13.618, lng: 123.180, path: '/profile'},
    { name: "Motech - Naga", phone: "0918 272 0463", address: "4400 Roxas Ave, Naga City", lat: 13.622, lng: 123.184, path: '/profile'},
    { name: "Aguila Glass - Naga", phone: "(054) 811 6019", address: "Door C, Benmar Bldg. Concepcion Grande, Naga City", lat: 13.617, lng: 123.179, path: '/profile'},
    { name: "Castrol Car Workshop - JOEL TIRE CAR CHECK CENTER", phone: "0910 644 1751", address: "Diversion Road, Pan-Philippine Hwy, Naga City", lat: 13.624, lng: 123.207, path: '/profile'},
    { name: "Luztech Automotives", phone: "0919 435 2284", address: "Balatas Rd, Naga City", lat: 13.611, lng: 123.184, path: '/profile'},
    { name: "KYX AUTO Repair Shop", phone: "0918 908 9681", address: "Sister Therese, Diversion Road, Naga City", lat: 13.627, lng: 123.200, path: '/profile'},
    { name: "Bong Auto Repair Shop", phone: "0910 122 8851", address: "Concepcion Pequeña, Naga City", lat: 13.614, lng: 123.190, path: '/profile'},
    { name: "HD-TECH Electronics & Aircon Service Center", phone: "+6354 472-2902", address: "Door 1, PLDC Building, Diversion Road, Naga City", lat: 13.629, lng: 123.206, path: '/profile'},
];

export const Map = () => {
    const mapReference = useRef(null);
    const changeToPath = useNavigate();

    const navigation = (path) => {
        changeToPath(path);
    };

    useEffect(() => {
        if(!mapReference.current) return;

        const minZoom = 12;
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

        shops.forEach(shop => {

            // const markerIcon = L.divIcon({
            //     className: 'map-marker',
            //     html: `<div class="map-marker-icon">
            //                 <h3></h3>
            //                 <img src=
            //             </div>`
            // });
            
            const shopMarker = L.marker([shop.lat, shop.lng]).addTo(map)
            const popUpContent = document.createElement('div');
            const popUpName = document.createElement('h2');
            popUpName.textContent = shop.name;
            const popUpAddress = document.createElement('p');
            popUpAddress.textContent = shop.address;

            popUpContent.appendChild(popUpName);
            popUpContent.appendChild(popUpAddress);

            popUpContent.addEventListener('click', () => {
                navigation(shop.path); 
            })

            shopMarker.bindPopup(popUpContent);
        }); 

        return () => {
            if(map){
                map.remove();
            }
        };

    }, []);

    return <div ref={mapReference} style={{ width: '1110px', height: '500px'}}/>
}