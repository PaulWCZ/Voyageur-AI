import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "Voyageur AI",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Find the vacation that suits you!",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "http://localhost:3001",
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=dark]`]["primary"],
  },
};

export default config;
