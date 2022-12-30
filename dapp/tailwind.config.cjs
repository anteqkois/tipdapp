const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      keyframes: {
        enter: {
          '0%': {
            transform: 'translate3d(0,-200%,0) scale(0.6)',
            opacity: 0.5,
          },
          '100%': {
            transform: 'translate3d(0,0,0) scale(1)',
            opacity: 1,
          },
        },
        leave: {
          '0%': {
            transform: 'translate3d(0,0,0) scale(1)',
            opacity: 1,
          },
          '100%': {
            transform: 'translate3d(0,-200%,0) scale(0.6)',
            opacity: 0,
          },
        },
      },
      animation: {
        enter:
          'enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards',
        leave:
          'leave 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards',
      },
      borderRadius: {
        DEFAULT: '.5rem',
      },
      boxShadow: {
        'inner-avatar': 'inset 0 0 7px 0 rgb(0 0 0 / 0.05)',
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
          DEFAULT: '#B91C1C',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
    },
  },
  plugins: [],
};
