import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "react-native-localize";

import en from "./locales/en.json";
import tr from "./locales/tr.json";

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = Localization.getLocales();
    callback(locales[0]?.languageCode || "en");
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
