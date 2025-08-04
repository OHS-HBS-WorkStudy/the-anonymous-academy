import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: 'hsl(285, 60%, 50%)',     // Rich purple
      light: 'hsl(285, 70%, 65%)',
      dark: 'hsl(285, 55%, 40%)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'hsl(25, 85%, 55%)',      // Sunset orange
      light: 'hsl(25, 90%, 65%)',
      dark: 'hsl(25, 75%, 45%)',
      contrastText: '#ffffff',
    },

    background: {
      default: 'hsl(330, 60%, 98%)',  // Soft blush
      paper: 'hsl(300, 50%, 97%)',    // Lavender paper
      alt: 'hsl(285, 60%, 96%)',
      input: 'hsl(285, 60%, 94%)',
    },

    glass: {
      lavender: 'rgba(230, 220, 250, 0.3)',
    },

    text: {
      primary: 'hsl(280, 25%, 15%)',
      secondary: 'hsl(280, 15%, 35%)',
      disabled: 'hsl(280, 10%, 60%)',
    },

    divider: 'hsl(280, 20%, 85%)',

    action: {
      hover: 'hsla(285, 70%, 50%, 0.08)',
      selected: 'hsla(285, 70%, 50%, 0.14)',
      disabled: 'hsla(280, 10%, 40%, 0.4)',
      disabledBackground: 'hsla(280, 10%, 40%, 0.1)',
    },

    info: {
      main: 'hsl(210, 80%, 55%)',
      contrastText: '#fff',
    },
    success: {
      main: 'hsl(145, 60%, 40%)',
      contrastText: '#fff',
    },
    warning: {
      main: 'hsl(40, 90%, 55%)',
      contrastText: '#fff',
    },
    error: {
      main: 'hsl(0, 70%, 55%)',
      contrastText: '#fff',
    },

    blueShades: {
      a0: 'hsl(285, 60%, 98%)',
      a10: 'hsl(285, 60%, 95%)',
      a20: 'hsl(285, 60%, 90%)',
      a30: 'hsl(285, 60%, 85%)',
      a40: 'hsl(285, 60%, 80%)',
      a50: 'hsl(285, 60%, 75%)',
    },

    sidebar: {
      background: 'hsl(285, 40%, 97%)',
    },
    appbar: {
      background: 'hsla(285, 50%, 98%, 0.8)', 
    },
  },


  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: 'hsl(210, 20%, 10%)',
    },
    h3: {
      fontWeight: 900,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      color: 'hsl(210, 20%, 10%)',
    },
    h4: {
      fontWeight: 800,
      fontSize: '2.2rem',
      color: 'hsl(210, 20%, 15%)',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: 'hsl(210, 20%, 10%)',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: 'hsl(210, 20%, 10%)',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: 'hsl(210, 10%, 40%)',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'hsl(210, 10%, 50%)',
    },
    button: {
      textTransform: 'none',
    },
  },

  spacing: 8,

  shape: {
    borderRadius: 12,
  },

  shadows: [
    'none',
    '0px 1px 2px hsla(210, 10%, 10%, 0.05)',
    '0px 2px 4px hsla(210, 10%, 10%, 0.08)',
    '0px 4px 8px hsla(210, 10%, 10%, 0.10)',
    '0px 6px 12px hsla(210, 10%, 10%, 0.12)',
    '0px 8px 16px hsla(210, 10%, 10%, 0.14)',
    '0px 10px 20px hsla(210, 10%, 10%, 0.16)',
  ].concat(Array(18).fill('none')),

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'hsl(210, 60%, 95%)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'hsl(210, 60%, 95%)',
          '& .MuiToggleButtonGroup-grouped': {
            margin: '0 !important',
            flexGrow: 1,
            border: 'none',
            borderRadius: '9px !important',
            fontWeight: 600,
            color: 'hsl(210, 10%, 40%)',
            '&.Mui-selected': {
              color: '#fff !important',
              backgroundColor: 'hsl(210, 75%, 50%) !important',
              '&:hover': {
                backgroundColor: 'hsl(210, 70%, 40%) !important',
              },
            },
            '&:hover': {
              backgroundColor: 'hsla(210, 75%, 50%, 0.12)',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '9px !important',
          '&.Mui-selected': {
            color: '#fff !important',
            backgroundColor: 'hsl(210, 75%, 50%) !important',
          },
        },
      },
    },
  },
});

export default defaultTheme;
