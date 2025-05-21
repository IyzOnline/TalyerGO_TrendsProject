// ShopsContext.js
import { createContext, useState, useContext, useEffect, useCallback } from "react"; 

const ShopsContext = createContext();

export const ShopsProvider = ({ children }) => {
  const [shops, setShops] = useState([]);

  const fetchShops = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "shops",
          // ADD THE NEW COLUMNS HERE
          columns: ["id", "name", "address", "lat", "lng", "shopcode", "image", "path", "rating", "opening_hours", "specializations", "services"],
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch shops");
      const data = await response.json();

      const formatted = data.map((shop) => ({
        ...shop,
        image: shop.image
          ? `/repairShops/${shop.image}`
          : `/repairShops/abs.png`, 
      }));

      setShops(formatted);
    } catch (err) {
      console.error(err);
      setShops([]);
    }
  }, []); 

  useEffect(() => {
    fetchShops(); 
  }, [fetchShops]);

  return <ShopsContext.Provider value={{ shops, fetchShops }}>{children}</ShopsContext.Provider>;
};

export const useShops = () => {
  return useContext(ShopsContext);
};