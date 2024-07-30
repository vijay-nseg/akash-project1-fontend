export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export function isObjectEmpty(obj) {
    return obj == null || Object.keys(obj).length === 0;
}
