export const getPageFromURL = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page") || "1";
    return parseInt(page);
}