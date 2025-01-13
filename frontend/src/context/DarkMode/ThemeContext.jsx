import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode ? JSON.parse(savedMode) : 'light';
    });

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                              background: {
                                  default: '#f2f2f2',
                                  paper: '#f4f4f4',
                              },
                              text: {
                                  primary: '#1c1c1c',
                                  secondary: '#3d3d3d',
                              },
                          }
                        : {
                              background: {
                                  default: '#020812',
                                  paper: '#0f131c',
                              },
                              text: {
                                  primary: '#f2f2f2',
                                  secondary: '#cccccc',
                              },
                          }),
                },
                typography: {
                    fontFamily: 'Roboto, sans-serif',
                    allVariants: {
                        color: mode === 'light' ? '#1c1c1c' : '#f2f2f2',
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
