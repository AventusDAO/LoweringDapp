import React, { useContext, useState } from "react";
import { themes, ThemeContext } from "../../Contexts/Context";
import { lightBright, nightDark, nightLight, lightDark } from "./themeIcons";

export const LightDarkMode = () => {
    const { changeTheme } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(true);
    return (
        <div
            className="align-self-center justify-center mx-auto text-center form-switch"
            style={{ marginTop: "15px", paddingRight: "35px" }}
        >
            <span
                className="align-self-center"
                style={{
                    marginRight: "10px",
                }}
            >
                {darkMode ? lightDark : lightBright}
            </span>
            <input
                className="align-self-center mx-auto form-check-input"
                type="checkbox"
                style={{ marginLeft: "250px" }}
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                }}
            />
            <span className="align-self-center" style={{ marginLeft: "10px" }}>
                {darkMode ? nightDark : nightLight}
            </span>
        </div>
    );
};
