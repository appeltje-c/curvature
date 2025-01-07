// @ts-ignore typescript complaning about types for the font
import '@fontsource-variable/outfit'
import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles'


const options: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#007BFF',
        },
        secondary: {
            main: '#76ff03',
        },
    },
    typography: {
        fontFamily: ['Outfit Variable'].join(',')
    }
}

export default responsiveFontSizes(createTheme(options))