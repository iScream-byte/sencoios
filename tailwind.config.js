/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./componentExtras/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleregular: [
          'Raleway-Regular'
        ],
        ralenormal: [
          'Raleway-Regular'
        ],
        ralemedium: [
          'Raleway-Medium'
        ],
        ralebold: [
          'Raleway-Bold'
        ],
        ralesemibold: [
          'Raleway-SemiBold'
        ],
        regular: [
          'OpenSans-Regular'
        ],
        normal: [
          'OpenSans-Regular'
        ],
        medium: [
          'OpenSans-Medium'
        ],
        bold: [
          'OpenSans-Bold'
        ],
        semibold: [
          'OpenSans-SemiBold'
        ],
        extrabold: [
          'OpenSans-ExtraBold'
        ],
    },
    colors:{
      primaryColor:'#FF1933'
    },
    },
  },
  plugins: [],
}

