const colors = require('tailwindcss/colors');
// function withOpacity(variableName) {
//   return ({ opacityValue }) => {
//     if (opacityValue !== undefined) {
//       return `rgba(var(${variableName}), ${opacityValue})`;
//     }
//     return `rgb(var(${variableName}))`;
//   };
// }

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.fuchsia,
        // primary: withOpacity('--color-primary'),
      },
      textColor: {
        // primary: withOpacity('--color-primary'),
      },
      backgroundColor: {
        // primary: withOpacity('--color-primary'),
      },
    },
  },
  plugins: [],
};
