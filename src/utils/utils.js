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
export const urlToParams = (string) => {
    let url = 'https://swapi.dev/api/'
    return string.replace(url,'')
}
export const getParams = (string) => {
    return string.slice(string.lastIndexOf('/')+1)
}
export const parseDate = (s, noTime = false) => {
    let d = new Date(s);

    let time = d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes();
    let date = d.getDate() +'/'+ (d.getMonth()+1) +'/'+ d.getFullYear();

    // return d.toLocaleString()
    if(noTime) return date
    else return date + ', ' + time;
}