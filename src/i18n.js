// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Today's List": "Today's List",
      "Title of task": "Title of task",
      "No tasks added yet": "No tasks added yet",
      "Added": "Added",
      "Done": "Done",
    }
  },
  es: {
    translation: {
      "Today's List": "Lista de Hoy",
      "Title of task": "Título de la tarea",
      "No tasks added yet": "No hay tareas todavía",
      "Added": "Agregada",
      "Done": "Terminada",
    }
  }
};

const userLanguage = navigator.language.split('-')[0];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage,
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;
