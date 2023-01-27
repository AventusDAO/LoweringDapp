import tryGetAvnAccountAddress from "../polkadotFunctions/polkaKey";
import generateAwtPayload from "./generateAwtPayload";
import AVN_API from "avn-api";
import { userSignatureConfirmation } from "../lowerUIchecks";

// Ensures the awt token is deleted from the localStorage of the browser when the tab is closed or reloaded.
window.onbeforeunload = function () {
    localStorage.removeItem("awt");
};

// Initialises the aventus gateway api
const API = new AVN_API();

/* Generates a new token if it's determined that there isn't one or the age of the current token is not valid.
    Also stores the new token in the localStorage of the user's browser, alongside the token age.
*/
async function generateNewToken(account) {
    await API.init();
    const result = await userSignatureConfirmation();
    if (result) {
        const signer = account.signer;
        const pKey = tryGetAvnAccountAddress(account.address);
        const issuedAt = Date.now();
        const payload = await generateAwtPayload(
            signer,
            account.address,
            pKey,
            issuedAt
        );
        if (payload) {
            const awtToken = API.awt.generateAwtTokenFromPayload(payload);
            var awtObject = {
                token: awtToken,
                age: issuedAt,
                user: account.address,
            };
            localStorage.setItem("awt", JSON.stringify(awtObject));
            return awtToken;
        } else return undefined;
    }
}

/*
Checks if a token exists in the localStorage of the client's brower.
Checks if the age of the awtToken is valid.
Generates a new token if one is required.
*/
async function getToken(account) {
    if (localStorage.getItem("awt")) {
        const awt = JSON.parse(localStorage.getItem("awt"));
        const token = awt.token;
        const prevTime = awt.age;
        const user = awt.user;
        if (account.address === user) {
            var ageChecker = Number(prevTime);
            ageChecker += 60000;
            const nowTime = Date.now();
            if (ageChecker > nowTime) {
                return token;
            } else {
                const token = await generateNewToken(account);
                return token;
            }
        } else {
            const token = await generateNewToken(account);
            return token;
        }
    } else {
        const token = await generateNewToken(account);
        return token;
    }
}

export default getToken;
