import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import "../App.css"
import orangemarker from '../images/orangemarker.png';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

//this is a temporary solution to be deleted later.
import cbros from "../images/repairShops/cbros.png";
import motech from "../images/repairShops/motech.png";
import abs from "../images/repairShops/abs.png";
import ajf from "../images/repairShops/ajf.png";
import carcido from "../images/repairShops/carcido.png";
import carniguan from "../images/repairShops/carniguan.png";
import cartown from "../images/repairShops/cartown.png";
import coachgene from "../images/repairShops/coachgene.png";
import fullyfix from "../images/repairShops/fullyfix.png";
import jlhabana from "../images/repairShops/jlhabana.png";
import nagasouthern from "../images/repairShops/nagasouthern.png";
import nl from "../images/repairShops/nl.png";
import onyok from "../images/repairShops/onyok.png";
import shell360 from "../images/repairShops/shell360.png";
import walls from "../images/repairShops/walls.png";
//this is a temporary solution to be deleted later.

const shops = [
    {name: "C-Bros Genuine Autoparts & Accessories, Inc", address: "Diversion Road Barangay, Naga, 4400 Camarines Sur", lat: 13.616506316616706, lng: 123.18848629211855, image: cbros, path: "/profile/cbros"},
    {name: "Motech - Naga", address: "4400 Roxas Ave, Naga, 4400 Camarines Sur", lat: 13.620279825462703, lng: 123.20137956829036, image: motech, path: "/profile/motech"},
    {name: "Wall's Car Aircon Parts and Services", address: "Door 12, PLDC Bldg, Diversion Road, Roxas Ave, Naga, Camarines Sur", lat: 13.618377200662785, lng: 123.19712296374875 , image: walls, path: "/profile/walls"},
    {name: "Fullyfix Auto Service", address: "Z-1 Panganiban Dr, Brgy. Triangulo, Naga, 4400 Camarines Sur", lat: 13.622257954284809 , lng: 123.19409859575875, image: fullyfix, path: "/profile/fullyfix"},
    {name: "Shell 360 Autoworx Panganiban", address: "J5FQ+7F2, Panganiban Dr, Naga, 4400 Camarines Sur", lat: 13.6232889087574, lng: 123.18850415957262, image: shell360, path: "/profile/shell360"},
    {name: "AJF Auto Repair Shop", address: "Salvacion street, Mabolo-Camaligan-Gainza Rd, Naga, 4400 Camarines Sur", lat: 13.615260067890036, lng: 123.17430931094292, image: ajf, path: "/profile/ajf"},
    {name: "Car Town Auto Shop", address: "53 Jacob, Naga, 4400 Camarines Sur", lat: 13.634639219551847, lng: 123.19136631178144 , image: cartown, path: "/profile/cartown"},
    {name: "CARniguan Auto Services", address: "3 San Sebastian St, Naga, 4400 Camarines Sur", lat: 13.62433531403645, lng: 123.19522146357924, image: carniguan, path: "/profile/carniguan"},
    {name: "JL Habana Tire Supply & Auto Repair Shop", address: "Pan-philippine, 1 1, Naga, 4400 Camarines Sur", lat: 13.623346053631177, lng: 123.20820496796051, image: jlhabana, path: "/profile/jlhabana"},
    {name: "Coachgene Tires & Auto Repair Shop", address: "Con. Pequeña, 4400 Naga City, Philippines, Naga City, Philippines", lat: 13.621928973775246, lng: 123.2022490651836, image: coachgene, path: "/profile/coachgene"},
    {name: "Carcido Automotor Center", address: "40 Magsaysay Ave, Naga, 4400 Camarines Sur", lat: 13.624519834304605, lng: 123.20159803808114, image: carcido, path: "/profile/carcio"},
    {name: "ABS Mufflers & Headers and Exhaust System", address: "Zone 2 1, Naga, 4400 Camarines Sur", lat: 13.621758196272166, lng: 123.20730596745132, image: abs, path: "/profile/abs"},
    {name: "Naga Southern Auto Supply", address: "FEDMCSI Building, Panganiban Dr, Barangay Concepcion Pequeña, Naga, 4400 Camarines Sur", lat: 13.621119668475943, lng: 123.2000057150795, image: nagasouthern, path: "/profile/nagasouthern"},
    {name: "Onyok Auto Repair Shop", address: "J59V+RH3 Brgy, Waling-waling St, Naga, Camarines Sur", lat: 13.620603397495811, lng: 123.19408804096977, image: onyok, path: "/profile/onyok"},
    {name: "NL Auto Repair Shop & Tire Supply", address: "Juan Q. Miranda Ave., Concepcion Pequeña, Naga City.", lat: 13.62216772808348, lng: 123.21937531009537, image: nl, path: "/profile/nl"}
];

export const Map = () => {
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