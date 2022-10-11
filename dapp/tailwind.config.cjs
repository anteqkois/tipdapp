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
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        DEFAULT: '.75rem',
      },
      colors: {
        primary: {
          ...colors.purple,
          light: colors.purple[600],
          DEFAULT: colors.purple[700],
          dark: colors.purple[800],
        },
        secondary: {
          light: colors.teal[600],
          DEFAULT: colors.teal[700],
          dark: colors.teal[800],
          ...colors.teal,
        },
        neutral: {
          light: colors.neutral[600],
          DEFAULT: colors.neutral[800],
          dark: colors.neutral[800],
          150: '#EEEEEE',
        },
        success: {
          // 50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // primary: withOpacity('--color-primary'),
      },
    },
  },
  plugins: [],
};
