function dateHandler(timestamp) {
    const full_date = new Date(timestamp);
    const full = full_date.toLocaleString().split(",");
    return full;
}

export default dateHandler;
