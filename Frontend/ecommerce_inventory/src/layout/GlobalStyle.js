/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

// Define the Global Styles
export const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        /* Hide scrollbars initially */
        * {
          scrollbar-width: none; /* Firefox */
        }
        *::-webkit-scrollbar {
          width: 4px; /* Set the scrollbar width to 4px */
        }

        /* Show scrollbars on hover of scrollable elements */
        *:hover {
          scrollbar-width: thin; /* Firefox */
        }
        *:hover::-webkit-scrollbar {
          display: block; /* Webkit-based browsers */
        }

        /* Scrollbar track */
        *::-webkit-scrollbar-track {
          background: ${theme.palette.background.paper};
        }

        /* Scrollbar thumb with gradient */
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark});
          border-radius: 10px;
          border: 2px solid ${theme.palette.background.paper};
        }
        *:hover::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark});
        }

        /* Remove scrollbar buttons */
        *::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }

        /* Ensure no default scrollbar buttons */
        *::-webkit-scrollbar-button:start:decrement,
        *::-webkit-scrollbar-button:end:increment,
        *::-webkit-scrollbar-button:vertical:start:increment,
        *::-webkit-scrollbar-button:vertical:end:decrement {
          display: none;
        }

        /* Firefox scrollbar color */
        * {
          scrollbar-color: ${theme.palette.primary.main} ${theme.palette.background.paper};
        }
        .profile-icon{
          background-color:${theme.palette.primary.main}!important;
          margin-right:7px!important;
        }
        .theme-icon{
          margin-right:7px!important;  
          background-color:${theme.palette.primary.light}!important;
        }
        body {
          /* Define scrollbar styles for Chrome */
          scrollbar-width: thin;
          scrollbar-color: ${theme.palette.primary.main} ${theme.palette.background.default};
  
          /* Define scrollbar styles for Firefox */
          scrollbar-width: thin;
          scrollbar-color: ${theme.palette.primary.main} ${theme.palette.background.default};
  
          /* Hide scrollbar arrows */
          &::-webkit-scrollbar {
            width: 10px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: ${theme.palette.primary.main};
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background-color: ${theme.palette.background.default};
          }
          &::-webkit-scrollbar-button {
            display: none; /* Hide scrollbar arrows */
          }
  
          /* Hide scrollbar arrows in Firefox */
          scrollbar-width: thin;
          scrollbar-color: ${theme.palette.primary.main} ${theme.palette.background.default};
        }
        
      `}
    />
  );
};
