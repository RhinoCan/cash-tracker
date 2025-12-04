import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myTheme",
    themes: {
      myTheme: {
        dark: false,
        colors: {
          // Brand colors
          primary: "#008080", // Teal
          secondary: "#FF7043", // Orange

          // Status colors
          success: "#43A047", // Green / Income
          error: "#E53935", // Red / Expense
          warning: "#FDD835", // Yellow / caution

          // Surfaces
          background: "#ECEFF1", // Page background
          surface: "#FFFFFF", // Card backgrounds
          "on-primary": "#FFFFFF", // Text on primary
          "on-secondary": "#FFFFFF", // Text on secondary
          "on-surface": "#212121", // Text on cards
          "on-background": "#212121", // Text on page background
        },
      },
    },
  },
  typography: {
    global: true,
    defaultFontFamily: "Lato, sans-serif",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
