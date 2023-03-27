export const removePrefix = (str: string, prefix: string) => {
    return str.startsWith(prefix) ? str.slice(prefix.length) : str;
};

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
