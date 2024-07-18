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

        .fileInput{
            border:1px solid ${theme.palette.primary.main};
            padding: 10px;
        }
        .fileInput label{
          margin-right:10px;
        }
        .active-sidebar{
          background-color:${theme.palette.primary.dark}!important;
          color:${theme.palette.background.light}!important;
          border-radius:12px!important;
          box-shadow:0 0 10px 0 ${theme.palette.primary.main}!important;
        }
        .active-sidebar svg{
          color:${theme.palette.background.light}!important;
        }
        .shimmer{
          width:100%;
          height:100%;
          margin:10px;
          background: linear-gradient(to right, ${theme.palette.background.paper} 8%, ${theme.palette.background.default} 18%, ${theme.palette.background.paper} 33%);
          background-size: 800px 104px;
          animation:shimmer 1.2s infinite;
          border-radius:8px;
        }
          @keyframes shimmer{
              0%{
                  background-position:-800px 0;
              }
              100%{
                  background-position:800px 0;
              }
          }
          .MuiDialogContent-root{
            background-color:${theme.palette.background.default};
          }
      `}
    />
  );
};
