import { createContext, useContext, useEffect, useState } from "react";
import HomeService from "../service/Home";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await HomeService.homePage();
        setHomeData(res?.data || null);
      } catch (err) {
        console.error("Home data fetch failed", err);
      }
    };

    fetchHome();
  }, []);

  return (
    <HomeContext.Provider value={{ homeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
