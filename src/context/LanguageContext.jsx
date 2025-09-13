import { useContext, createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState();

  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
