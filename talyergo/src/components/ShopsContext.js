import { createContext, useState, useContext } from "react";

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

const ShopsContext = createContext();

const shopsList = [
    {name: "C-Bros Genuine Autoparts & Accessories, Inc", address: "Diversion Road Barangay, Naga, 4400 Camarines Sur", lat: 13.616506316616706, lng: 123.18848629211855, shopcode: "cbros", image: cbros, path: "/profile/cbros"},
    {name: "Motech - Naga", address: "4400 Roxas Ave, Naga, 4400 Camarines Sur", lat: 13.620279825462703, lng: 123.20137956829036, shopcode: "motech", image: motech, path: "/profile/motech"},
    {name: "Wall's Car Aircon Parts and Services", address: "Door 12, PLDC Bldg, Diversion Road, Roxas Ave, Naga, Camarines Sur", lat: 13.618377200662785, lng: 123.19712296374875 , shopcode: "walls", image: walls, path: "/profile/walls"},
    {name: "Fullyfix Auto Service", address: "Z-1 Panganiban Dr, Brgy. Triangulo, Naga, 4400 Camarines Sur", lat: 13.622257954284809 , lng: 123.19409859575875, shopcode: "fullyfix", image: fullyfix, path: "/profile/fullyfix"},
    {name: "Shell 360 Autoworx Panganiban", address: "J5FQ+7F2, Panganiban Dr, Naga, 4400 Camarines Sur", lat: 13.6232889087574, lng: 123.18850415957262, shopcode: "shell360", image: shell360, path: "/profile/shell360"},
    {name: "AJF Auto Repair Shop", address: "Salvacion street, Mabolo-Camaligan-Gainza Rd, Naga, 4400 Camarines Sur", lat: 13.615260067890036, lng: 123.17430931094292, shopcode: "ajf", image: ajf, path: "/profile/ajf"},
    {name: "Car Town Auto Shop", address: "53 Jacob, Naga, 4400 Camarines Sur", lat: 13.634639219551847, lng: 123.19136631178144 , shopcode: "cartown", image: cartown, path: "/profile/cartown"},
    {name: "CARniguan Auto Services", address: "3 San Sebastian St, Naga, 4400 Camarines Sur", lat: 13.62433531403645, lng: 123.19522146357924, shopcode: "carniguan", image: carniguan, path: "/profile/carniguan"},
    {name: "JL Habana Tire Supply & Auto Repair Shop", address: "Pan-philippine, 1 1, Naga, 4400 Camarines Sur", lat: 13.623346053631177, lng: 123.20820496796051, shopcode: "jlhabana", image: jlhabana, path: "/profile/jlhabana"},
    {name: "Coachgene Tires & Auto Repair Shop", address: "Con. Pequeña, 4400 Naga City, Philippines, Naga City, Philippines", lat: 13.621928973775246, lng: 123.2022490651836, shopcode: "coachgene", image: coachgene, path: "/profile/coachgene"},
    {name: "Carcido Automotor Center", address: "40 Magsaysay Ave, Naga, 4400 Camarines Sur", lat: 13.624519834304605, lng: 123.20159803808114, shopcode: "carcido", image: carcido, path: "/profile/carcio"},
    {name: "ABS Mufflers & Headers and Exhaust System", address: "Zone 2 1, Naga, 4400 Camarines Sur", lat: 13.621758196272166, lng: 123.20730596745132, shopcode: "abs", image: abs, path: "/profile/abs"},
    {name: "Naga Southern Auto Supply", address: "FEDMCSI Building, Panganiban Dr, Barangay Concepcion Pequeña, Naga, 4400 Camarines Sur", lat: 13.621119668475943, lng: 123.2000057150795, shopcode: "nagasouthern", image: nagasouthern, path: "/profile/nagasouthern"},
    {name: "Onyok Auto Repair Shop", address: "J59V+RH3 Brgy, Waling-waling St, Naga, Camarines Sur", lat: 13.620603397495811, lng: 123.19408804096977, shopcode: "onyok", image: onyok, path: "/profile/onyok"},
    {name: "NL Auto Repair Shop & Tire Supply", address: "Juan Q. Miranda Ave., Concepcion Pequeña, Naga City.", lat: 13.62216772808348, lng: 123.21937531009537, shopcode: "nl", image: nl, path: "/profile/nl"}
];

export const ShopsProvider = ({children}) => {
    const [shops, setShops] = useState(shopsList);

    return (
        <ShopsContext.Provider value={shops}>
            {children}
        </ShopsContext.Provider>
    );
}

export const useShops = () => {
    return useContext(ShopsContext);
}