import { createTheme } from '@mui/material';

const muiTheme = createTheme({
    background: 'white',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1440,
            xl: 1964,
        },
    },
    palette: {
        primary: {
            main: '#EB078C',
            dark: '#EB078C',
        },
        baseColor: '#EB078C',
        baseColorTxt: '#6c757d',
        roseTxt: '#EC0489',
        lightGreyTxt: '#98a6ad',
        backgroundGray: '#F9F9F9',
        titleDarkRed: '#0B1B39',
        fontColorRed: '#EB078C',
    },
});

export default muiTheme;
