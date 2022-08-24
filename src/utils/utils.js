export const camelCaseSpace = (string) => {
    return string.replace(/(^|[^a-z0-9]+?)[a-z0-9]/ig, function (m) {
            if (m.length === 1) return m.toUpperCase() //upper case first character
            return ' ' + m[1].toUpperCase() //remove symbols
        }
    );
}
export const isURL = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}