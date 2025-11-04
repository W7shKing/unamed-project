import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			search_placeholder: 'Search places in Dubai',
			clear: 'Clear',
			trending_now: 'Trending now',
			see_all: 'See all',
			unknown_place: 'Unknown place'
		}
	},
	ar: {
		translation: {
			search_placeholder: 'ابحث عن أماكن في دبي',
			clear: 'مسح',
			trending_now: 'الأكثر رواجًا الآن',
			see_all: 'عرض الكل',
			unknown_place: 'مكان غير معروف'
		}
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: { escapeValue: false }
});

export default i18n;
