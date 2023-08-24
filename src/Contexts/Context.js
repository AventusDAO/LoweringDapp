import { createContext } from "react";

export const stateContext = createContext({});
export const formContext = createContext({});
export const pageContext = createContext({});
export const lowerDataContext = createContext({});
export const balanceFormContext = createContext({});
export const queryBalanceContext = createContext({});
export const balanceButtonContext = createContext({});

export const themes = {
    dark: "",
    light: "white-content",
};

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: () => {},
});
