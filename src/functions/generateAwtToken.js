import tryGetAvnAccountAddress from "./polkaKey";
import generateAwtPayload from "./generateAwtPayload";
import AVN_API from "avn-api";
import swal from "sweetalert2";

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
    const { isConfirmed: result } = await swal.fire({
        title: "Need Your Signature!",
        text: "This signature will authenticate you and generate the AWT token unique to your account",
        showDenyButton: true,
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
    });
    if (result) {
        console.log(result);
        const signer = account.signer;
        const pKey = tryGetAvnAccountAddress(account.address);
        const issuedAt = Date.now();
        const payload = await generateAwtPayload(
            signer,
            account.address,
            pKey,
            issuedAt
        );
        const awtToken = API.awt.generateAwtTokenFromPayload(payload);
        var awtObject = { token: awtToken, age: issuedAt };
        localStorage.setItem("awt", JSON.stringify(awtObject));
        return awtToken;
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
        var ageChecker = Number(prevTime);
        ageChecker += 60000;
        const nowTime = Date.now();
        if (ageChecker > nowTime) {
            return token;
        } else {
            const token = await generateNewToken(account);
            console.log(token);
            return token;
        }
    } else {
        const token = await generateNewToken(account);
        console.log(token);
        return token;
    }
}

export default getToken;
