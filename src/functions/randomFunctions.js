export function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addressSlicer(address, num_1, num_2) {
    return address.slice(0, num_1) + "..." + address.slice(num_2);
}
