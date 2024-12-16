import { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from "prop-types";


// Create the context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);


export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("ar");

  // Function to update the font family based on the language
  const updateFontFamily = (lang) => {
    document.body.className = `font-${lang}`;
  };


  useEffect(() => {
    // Set initial language from localStorage or default to 'en'
    i18n.changeLanguage(language);
    updateFontFamily(language); // Apply the font family immediately

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove(`font-${language}`);
    };
  }, [language, i18n]);


  useEffect(() => {
    // Change the i18n language on mount and when language changes
    const currentLang = localStorage.getItem("langAR") || "ar";
    setLanguage(currentLang);
    i18n.changeLanguage(currentLang);
  }, [i18n]);

  const changeLanguage = (lng) => {
    setLanguage(lng); // Update the state
    localStorage.setItem("langAR", lng); // Save the language preference
    i18n.changeLanguage(lng); // Change the i18n language

    // Update the class of the body element based on the current language
    updateFontFamily(lng);
  };

  // Provide the language state and changeLanguage function to the context
  return (
    <LanguageContext.Provider value={{i18n, language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};



LanguageProvider.propTypes = {
  children: PropTypes.element,
};