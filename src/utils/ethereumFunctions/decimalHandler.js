import LoadWeb3 from "./loadWeb3";

const DECIMALS_FUNC_SELECTOR = "0x313ce567";
const ERC1820_INTERFACE_IMPLEMENTER_FUNC_SELECTOR = "0xaabbb8ca";
const ERC1820_REGISTRY_CREATE2_ADDRESS =
    "0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24"; // Same address for mainnet and rinkeby
const ERC777_INTERFACE_HASH =
    "ac7fbab5f54a3ca8194167523c6753bfeb96a445279294b6125b68cce2177054";
const ETH_OR_AVT_DECIMALS = 18;

async function fullDecimalAmount(amount, token, isERC777) {
    const load = await LoadWeb3();
    const BN = load.utils.BN;
    let decimals = ETH_OR_AVT_DECIMALS;

    if (token) {
        const isValidAddress = load.utils.isAddress(token);
        if (!isValidAddress) return null;

        const isValidContract = (await load.eth.getCode(token)) !== "0x";
        if (!isValidContract) return null;

        decimals = await load.eth
            .call({ to: token, data: DECIMALS_FUNC_SELECTOR })
            .catch((error) => false);
        if (!decimals) return null;

        if (isERC777 && (await implementsERC777(load, token)) === false)
            return null;
    }

    let [intAmount, decAmount] = amount.toString().split(".");
    intAmount = new BN(intAmount).mul(new BN(10).pow(new BN(decimals)));

    decAmount = decAmount
        ? new BN(decAmount).mul(
              new BN(10).pow(new BN(decimals - decAmount.length))
          )
        : new BN(0);

    return intAmount.add(decAmount);
}

async function implementsERC777(load, token) {
    const paddedToken =
        "000000000000000000000000" + token.toLowerCase().substring(2);
    const data =
        ERC1820_INTERFACE_IMPLEMENTER_FUNC_SELECTOR +
        paddedToken +
        ERC777_INTERFACE_HASH;
    return (
        (await load.eth.call({
            to: ERC1820_REGISTRY_CREATE2_ADDRESS,
            data,
        })) ===
        "0x" + paddedToken
    );
}

export async function tokenAmountChecker(
    tokenAmount,
    token,
    isERC20,
    isERC777
) {
    let result;
    if (isERC777)
        result = await fullDecimalAmount(tokenAmount, token, isERC777);
    else if (isERC20) result = await fullDecimalAmount(tokenAmount, token);
    else result = await fullDecimalAmount(tokenAmount);
    return result.toString();
}
