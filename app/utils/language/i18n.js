import i18n from 'i18n-js';

import en from './en.json';
import es from './es.json';

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.fallback = true;
i18n.translations = { en, es };

i18n.switchLanguage = () => {
  I18n.locale = 'es';
};

export default i18n;
