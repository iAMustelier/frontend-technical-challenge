/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#32e685',
                lprimary: '#84f0b6',
                dprimary: '#145c35',
                gray: '#343437',
                lgray: '#a2a2a4',
            },
        },
    },
    plugins: [],
};
