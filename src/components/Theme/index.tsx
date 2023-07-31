import { loadTheme, ThemeProvider } from '@fluentui/react'
import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const componentsStyles = {
  PrimaryButton: {
    styles: {
      root: {
        borderRadius: 10,
      },
    },
  },
  DefaultButton: {
    styles: {
      root: {
        borderRadius: 10,
      },
    },
  },
  Dropdown: {
    styles: {
      dropdown: {
        ':focus::after': {
          borderRadius: 10,
        },
      },
      title: {
        borderRadius: 10,
      },
    },
  },
  TextField: {
    styles: {
      fieldGroup: {
        borderRadius: 10,
        '::after': {
          borderRadius: 10,
        },
      },
    },
  },
  TagPicker: {
    styles: {
      text: {
        borderRadius: 10,
        '::after': {
          borderRadius: 10,
        },
      },
    },
  },
  ComboBox: {
    styles: {
      root: {
        borderRadius: 10,
        '::after': {
          borderRadius: 10,
        },
        button: {
          background: 'none',
          ':hover': {
            background: 'none',
          },
        },
      },
      input: {
        borderRadius: 10,
      },
      optionsContainerWrapper: {
        borderRadius: 10,
      },
    },
  },
  SearchBox: {
    styles: {
      root: {
        borderRadius: 10,
        '::after': {
          borderRadius: 10,
        },
      },
    },
  },
}

const darkTheme = loadTheme({
  palette: {
    themePrimary: '#ffcc00',
    themeLighterAlt: '#0a0800',
    themeLighter: '#292100',
    themeLight: '#4d3d00',
    themeTertiary: '#997a00',
    themeSecondary: '#e0b400',
    themeDarkAlt: '#ffd119',
    themeDark: '#ffd83d',
    themeDarker: '#ffe270',
    neutralLighterAlt: '#262523',
    neutralLighter: '#2f2d2c',
    neutralLight: '#3d3b39',
    neutralQuaternaryAlt: '#464442',
    neutralQuaternary: '#4d4b49',
    neutralTertiaryAlt: '#6b6966',
    neutralTertiary: '#a9a9a9',
    neutralSecondary: '#f8f7f6',
    neutralPrimaryAlt: '#f9f9f8',
    neutralPrimary: '#f3f2f1',
    neutralDark: '#fcfcfb',
    black: '#fdfdfd',
    white: '#1b1a19',
  },
  semanticColors: {
    inputBorder: '#6b6966',
    menuBackground: '#2f2d2c',
    menuItemBackgroundHovered: '#262523',
    inputBackground: '#0a0800',
    inputPlaceholderText: '#949392',
    errorText: '#fd525a',
    disabledText: '#a9a9a9',
    disabledSubtext: '#a9a9a9',
  },
  components: componentsStyles,
})

const lightTheme = loadTheme({
  palette: {
    themePrimary: '#ffcc00',
    themeLighterAlt: '#fffdf5',
    themeLighter: '#fff7d6',
    themeLight: '#fff0b3',
    themeTertiary: '#ffe066',
    themeSecondary: '#ffd21f',
    themeDarkAlt: '#e6b800',
    themeDark: '#c29b00',
    themeDarker: '#8f7200',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
  components: componentsStyles,
})

interface ThemeProps {
  children: React.ReactNode
}

export const DarkTheme: React.FC<ThemeProps> = ({ children }) => (
  <StyledThemeProvider theme={darkTheme}>
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
  </StyledThemeProvider>
)

export const DefaultTheme: React.FC<ThemeProps> = ({ children }) => (
  <StyledThemeProvider theme={lightTheme}>
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
  </StyledThemeProvider>
)