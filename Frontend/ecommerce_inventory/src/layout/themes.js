import { createTheme } from '@mui/material/styles';

// Dark Theme
export const orangeDarkTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(255, 165, 0, 1)',
      dark: 'rgba(255, 140, 0, 1)',
      light: 'rgba(255, 140, 0, 1)',
    },
    secondary: {
      main: 'rgba(255, 222, 173, 1)',
    },
    background: {
      paper: 'rgba(45, 24, 0, 1)',
      default: 'rgba(45, 24, 0, 1)',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(255, 165, 0, 1)',
          color: 'rgba(45, 24, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 140, 0, 1)', // Orange hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 250, 240, 1)',
          color: 'rgba(45, 24, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 222, 173, 1)', // Light orange hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(45, 24, 0, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgb(71,52,31)!important',
        },
      },
    },
  },
});

export const orangeLightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(255, 165, 0, 1)',
      dark: 'rgba(255, 140, 0, 1)',
      light: 'rgba(255, 140, 0, 1)',
    },
    secondary: {
      main: 'rgba(255, 222, 173, 1)',
    },
    background: {
      paper: 'rgba(255, 250, 240, 1)',
      default: 'rgba(253, 245, 230, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(255, 165, 0, 1)',
          color: 'rgba(255, 250, 240, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 140, 0, 1)', // Orange hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 250, 240, 1)',
          color: 'rgba(0, 0, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 222, 173, 1)', // Light orange hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 250, 240, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgb(224,220,211)!important',
        },
      },
    },
  },
});

export const redDarkTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(255, 0, 0, 1)',
      dark: 'rgba(139, 0, 0, 1)',
      light: 'rgba(255, 0, 0, 1)',
    },
    secondary: {
      main: 'rgba(255, 228, 225, 1)',
    },
    background: {
      paper: 'rgba(55, 10, 10, 1)',
      default: 'rgba(55, 10, 10, 1)',
    },
    error: {
      main: 'rgba(255, 0, 0, 1)',
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(255, 0, 0, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(139, 0, 0, 1)', // Dark red hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 228, 225, 1)',
          color: 'rgba(55, 10, 10, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 192, 203, 1)', // Light red hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(55, 10, 10, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(55, 10, 10, 1)',
          borderBottom: '1px solid #616161',
          backgroundImage: 'none',
          borderBottomColor: 'rgb(79,40,40)!important',
        },
      },
    },
  },
});

export const redLightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(255, 0, 0, 1)',
      dark: 'rgba(139, 0, 0, 1)',
      light: 'rgba(255, 192, 203, 1)',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      paper: 'rgba(255, 228, 225, 1)',
      default: 'rgba(253, 236, 234, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(255, 0, 0, 1)',
          color: 'rgba(255, 228, 225, 1)',
          '&:hover': {
            backgroundColor: 'rgba(139, 0, 0, 1)', // Dark red hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 228, 225, 1)',
          color: 'rgba(255, 0, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 192, 203, 1)', // Light red hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 228, 225, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)',
          borderBottomColor: 'rgb(224,200,198)!important',
        },
      },
    },
  },
});
export const greenDarkTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(0, 128, 0, 1)',
      dark: 'rgba(0, 100, 0, 1)',
      light: 'rgba(0, 128, 0, 1)',
    },
    secondary: {
      main: 'rgba(240, 255, 240, 1)',
    },
    background: {
      paper: 'rgba(7, 35, 30, 1)',
      default: 'rgba(7, 35, 30, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(0, 128, 0, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 100, 0, 1)', // Dark green hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(240, 255, 240, 1)',
          color: 'rgba(0, 128, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(144, 238, 144, 1)', // Light green hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(7, 35, 30, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgb(37,62,57)!important',
        },
      },
    },
  },
});
export const greenLightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(0, 128, 0, 1)',
      dark: 'rgba(0, 100, 0, 1)',
      light: 'rgba(144, 238, 144, 1)',
    },
    secondary: {
      main: 'rgba(144, 238, 144, 1)',
    },
    background: {
      paper: 'rgba(240, 255, 240, 1)',
      default: 'rgba(232, 248, 232, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(0, 128, 0, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 100, 0, 1)', // Dark green hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(240, 255, 240, 1)',
          color: 'rgba(0, 128, 0, 1)',
          '&:hover': {
            backgroundColor: 'rgba(144, 238, 144, 1)', // Light green hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(240, 255, 240, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)',
          borderBottomColor: 'rgb(211,224,211)!important',
        },
      },
    },
  },
});

export const blueDarkTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(70, 130, 255, 1)',
      dark: 'rgba(0, 0, 255, 1)',
      light: 'rgba(70, 130, 255, 1)',
    },
    secondary: {
      main: 'rgba(70, 130, 255, 1)',
    },
    background: {
      paper: 'rgba(11, 6, 47, 1)',
      default: 'rgba(11, 6, 47, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(70, 130, 255, 1)',
          color: 'rgba(11, 6, 47, 1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 255, 1)', // Dark blue hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(240, 248, 255, 1)',
          color: 'rgba(70, 130, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(135, 206, 250, 1)', // Light blue hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(11, 6, 47, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgb(41,36,72)!important',
        },
      },
    },
  },
});

export const blueLightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(70, 130, 255, 1)',
      dark: 'rgba(0, 0, 255, 1)',
      light: 'rgba(135, 206, 250, 1)',
    },
    secondary: {
      main: 'rgba(135, 206, 250, 1)',
    },
    background: {
      paper: 'rgba(240, 248, 255, 1)',
      default: 'rgba(232, 242, 253, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(70, 130, 255, 1)',
          color: 'rgba(240, 248, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 255, 1)', // Dark blue hover color
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(240, 248, 255, 1)',
          color: 'rgba(70, 130, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(135, 206, 250, 1)', // Light blue hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(240, 248, 255, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)',
          borderBottomColor: 'rgb(211,218,224)!important',
        },
      },
    },
  },
});


export const customTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(128, 109, 255, 1)',
      dark: 'rgba(111, 88, 255, 1)',
      light: 'rgba(159, 84, 252, 1)',
    },
    secondary: {
      main: 'rgba(159, 84, 252, 1)',
    },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(230, 230, 230, 1)',
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    success: {
      main: '#4caf50', // Default MUI success color
    },
    warning: {
      main: '#ff9800', // Default MUI warning color
    },
    info: {
      main: '#2196f3', // Default MUI info color
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(128, 109, 255, 1)',
          color: 'rgba(255, 255, 255, 1)',
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: 'rgba(128, 109, 255, 1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)',
        },
      },
    },
  },
});
export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(128, 109, 255, 1)',
      dark: 'rgba(111, 88, 255, 1)',
      light: 'rgba(159, 84, 252, 1)',
    },
    secondary: {
      main: 'rgba(159, 84, 252, 1)',
    },
    background: {
      paper: 'rgba(241, 244, 250, 1)',
      default: 'rgba(255, 255, 255, 1)',
    },
    error: {
      main: 'rgba(255, 0, 0, 1)', // Set error color to red
    },
    success: {
      main: 'rgba(0, 128, 0, 1)', // Set success color to green
    },
    warning: {
      main: 'rgba(255, 165, 0, 1)', // Set warning color to orange
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)', // Set primary text color to black
      secondary: 'rgba(0, 0, 0, 1)', // Set secondary text color to black
      icon: 'rgba(0, 0, 0, 1)', // Set icon color to black
      color: 'rgba(0, 0, 0, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(128, 109, 255, 1)',
          color: 'rgba(255, 255, 255, 1)',
        },
        containedSecondary: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: 'rgba(128, 109, 255, 1)',
        },
        containedError: {
          backgroundColor: 'rgba(255, 0, 0, 1)', // Set background color for error button
          color: 'rgba(255, 255, 255, 1)', // Set text color for error button
        },
        containedSuccess: {
          backgroundColor: 'rgba(0, 128, 0, 1)', // Set background color for success button
          color: 'rgba(255, 255, 255, 1)', // Set text color for success button
        },
        containedWarning: {
          backgroundColor: 'rgba(255, 165, 0, 1)', // Set background color for warning button
          color: 'rgba(255, 255, 255, 1)', // Set text color for warning button
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(241, 244, 250, 1)',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)', // Set input text color to black
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& $notchedOutline': {
            borderColor: 'rgba(128, 109, 255, 1)', // Set input outline color to primary color
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 1)',
          borderBottomColor: 'rgb(212,214,220)!important',
        },
      },
    },
  },
});


export const darkTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(128, 109, 255, 1)',
      dark: 'rgba(111, 88, 255, 1)',
      light: 'rgba(159, 84, 252, 1)',
    },
    secondary: {
      main: 'rgba(159, 84, 252, 1)',
    },
    background: {
      paper: 'rgba(17, 17, 17, 1)',
      default: 'rgba(35, 35, 35, 1)',
    },
    error: {
      main: 'rgba(255, 0, 0, 1)',
    },
    success: {
      main: 'rgba(0, 128, 0, 1)', // Set success color to green
    },
    warning: {
      main: 'rgba(255, 165, 0, 1)', // Set warning color to orange
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(128, 109, 255, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(111, 88, 255, 1)', // Darker shade of primary color for hover
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(41, 36, 72, 1)', // Darker shade of secondary color for hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 17, 17, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomColor: 'rgb(71,71,71)!important',
        },
      },
    },
  },
});
export const basicTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(128, 109, 255, 1)',
      dark: 'rgba(111, 88, 255, 1)',
      light: 'rgba(159, 84, 252, 1)',
    },
    secondary: {
      main: 'rgba(159, 84, 252, 1)',
    },
    background: {
      paper: 'rgba(38, 40, 55, 1)',
      default: 'rgba(31, 29, 44, 1)',
    },
    error: {
      main: 'rgba(255, 0, 0, 1)',
    },
    success: {
      main: 'rgba(0, 128, 0, 1)',
    },
    warning: {
      main: 'rgba(255, 165, 0, 1)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: 'rgba(128, 109, 255, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(111, 88, 255, 1)', // Darker shade of primary color for hover
          },
        },
        containedSecondary: {
          backgroundColor: 'rgba(38, 40, 55, 1)',
          color: 'rgba(255, 255, 255, 1)',
          '&:hover': {
            backgroundColor: 'rgba(27, 29, 39, 1)', // Darker shade of secondary color for hover
          },
        },
        containedError: {
          backgroundColor: 'rgba(255, 0, 0, 1)', // Set background color for error button
          color: 'rgba(255, 255, 255, 1)', // Set text color for error button
        },
        containedSuccess: {
          backgroundColor: 'rgba(0, 128, 0, 1)', // Set background color for success button
          color: 'rgba(255, 255, 255, 1)', // Set text color for success button
        },
        containedWarning: {
          backgroundColor: 'rgba(255, 165, 0, 1)', // Set background color for warning button
          color: 'rgba(255, 255, 255, 1)', // Set text color for warning button
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(38, 40, 55, 1)',
        },
      },
    },
  },
});
