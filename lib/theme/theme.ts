// Using a theme here is definitely overkill, but in a real project there would likely be a lot more requirements to adhere to
// With a bit more time, it'd make sense to split these out into a constants file so we can reliably use them in the app w/o mistypes

const customTheme = {
  fonts: {
    body: `'Source Sans Pro', sans-serif;`,
  },
  fontSizes: {
    large: "1.5rem",
    default: "1rem",
  },
  headerSizes: {
    larger: "3rem",
    large: "1.313rem",
  },
  zIndex: {
    highest: 1060,
    higher: 1050,
    high: 1040,
    medium: 1030,
    low: 1020,
    lower: 1010,
    lowest: 1000,
  },
};

export default customTheme;
