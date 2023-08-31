import tryGetAvnAccountAddress from "../polkadotFunctions/polkaKey";
import generateAwtPayload from "./generateAwtPayload";
import AVN_API from "avn-api";
import { confirmAWTTokenClearance, userAWTGeneration } from "../someUIpopups";

// Ensures the awt token is deleted from the localStorage of the browser when the tab is closed or reloaded.
window.onbeforeunload = function () {
    localStorage.removeItem("awt");
};

// Initialises the aventus gateway api
const API = new AVN_API(null, { suri: "x" });

/* Generates a new token if it's determined that there isn't one or the age of the current token is not valid.
    Also stores the new token in the localStorage of the user's browser, alongside the token age.
*/
async function generateNewToken(account, userHasNoPayer) {
    await API.init();
    const hasPayer = userHasNoPayer ? false : await userAWTGeneration();
    // check hasPayer has a value of true/false.
    if (hasPayer === true || hasPayer === false) {
        const signer = account.signer;
        const pKey = tryGetAvnAccountAddress(account.address);
        const issuedAt = Date.now();
        const payload = await generateAwtPayload({
            signer,
            userAddress: account.address,
            publicKey: pKey,
            issuedAt,
            hasPayer,
        });
        if (payload) {
            const awtToken = API.awt.generateAwtTokenFromPayload(payload);
            var awtObject = {
                token: awtToken,
                age: issuedAt,
                user: account.address,
                hasPayer,
            };
            localStorage.setItem("awt", JSON.stringify(awtObject));
            return { awtToken, hasPayer };
        } else return undefined;
    }
}

/*
Checks if a token exists in the localStorage of the client's brower.
Checks if the age of the awtToken is valid.
Generates a new token if one is required.
*/
export default async function getToken(account) {
    if (localStorage.getItem("awt")) {
        const awt = JSON.parse(localStorage.getItem("awt"));
        const awtToken = awt.token;
        const prevTime = awt.age;
        const user = awt.user;
        const hasPayer = awt.hasPayer;
        if (account.address === user) {
            var ageChecker = Number(prevTime);
            ageChecker += 600000;
            const nowTime = Date.now();
            if (ageChecker > nowTime) {
                return { awtToken, hasPayer };
            } else {
                return await generateNewToken(account);
            }
        } else {
            return await generateNewToken(account);
        }
    } else {
        return await generateNewToken(account);
    }
}

// Clears any existing token from the local storage and prompts the generation of a new token.
export async function clearToken(account, userHasNoPayer) {
    if (userHasNoPayer) {
        localStorage.clear("awt");
        generateNewToken(account, userHasNoPayer);
    } else {
        const doesUserApprove = await confirmAWTTokenClearance();
        if (doesUserApprove) {
            localStorage.clear("awt");
            generateNewToken(account, userHasNoPayer);
        }
    }
}
