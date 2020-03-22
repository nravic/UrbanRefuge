import LocalizedStrings from 'react-native-localization';

export const DEFAULT_LANGUAGE = 'en';

const translations = {
    en: {
	view_map: "View Available Resources",
	lang_change: "Change Language",
	health: "Health",
	food: "Food",
	immigration: "Immigration",
	housing: "Housing",
	loading: "Map is Loading",
	website: "Website",
	details: "Details",
	name: "Name",
	phys_refer: "Physician Referral Required",
	phone_num: "Phone Number",
	ssn_req: "SSN Required",
	open_map: "Open in Maps Application"
    },

    es: {
        view_map: "Ver Recursos Disponibles",
        lang_change: "Cambar Idioma",
        health: "Salud",
        food: "Comida",
        immigration: "Inmigracion",
        housing: "Alojamiento",
        loading: "Mapa se Está Cargando",
	website: "Sitio Web",
        details: "Detalles",
        name: "Nombre",
        phys_refer: "Se Requiere Referencia Medica",
        ssn_req: "SSN Requiere",
        open_map: "Abrir en la Aplicacion Mapas",
        phone_num: "Número De Teléfono"
    }
};

export default new LocalizedStrings(translations);


