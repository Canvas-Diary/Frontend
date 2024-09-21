/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      color: {
        gray: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#454545',
          800: '#3D3D3D',
          900: '#000000'
        },
        primary: {
          'light-1': '#F9F5FF',
          'light-2': '#F2E9FE',
          'light-3': '#D4B6FC',
          medium: '#A059F3',
          normal: '#6424A5'
        },
        status: {
          positive: '#00BF40',
          negative: '#EB022B'
        },
        static: {
          black: '#000000',
          white: '#FFFFFF',
          Background: '#FCFCFC'
        }
      },
      borderRadius: {
        50: '0.5rem',
        100: '0.75rem',
        200: '1rem',
        300: '1.25rem'
      },
      boxShadow: {
        default: '0 0.125rem 8px 0 rgba(0, 0, 0, 0.08)'
      },
      fontFamily: {
        Binggrae: ['Binggrae'],
        Pretendard: ['Pretendard']
      },
      fontSize: {
        'title-1': '1.5rem',
        'title-2': '1.375rem',
        'heading-1': '1.25rem',
        'heading-2': '1.75rem',
        'body-1': '1rem',
        'body-2': '0.875rem',
        'detail-1': '0.75rem'
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        medium: 500,
        regular: 400
      },
      spacing: {
        0: '0rem',
        100: '0.125rem',
        200: '0.25rem',
        300: '0.5rem',
        400: '0.625rem',
        500: '0.75rem',
        600: '1rem',
        700: '1.25rem',
        800: '1.5rem',
        900: '2rem'
      }
    }
  },
  plugins: []
}
