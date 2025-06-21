import { useEffect } from "react";

const Animation = () => {
  useEffect(() => {
    
    let WOW;
    if (typeof window !== "undefined") {
      try {
        WOW = require("wowjs");
        const wowInstance = new WOW.WOW({ live: false }); // ✅ Correct syntax
        wowInstance.init();
      } catch (error) {
        console.warn("WOW.js failed to initialize:", error);
      }
    }

    
    return () => {
      if (typeof window !== "undefined") {
        const wowElements = document.querySelectorAll(".wow");
        wowElements.forEach((el) => {
          el.classList.remove("animated");
          el.style.visibility = "";
        });
      }
    };
  }, []);

  return null; 
};

export default Animation;