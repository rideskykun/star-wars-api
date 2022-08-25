// Build Header
const buildHeader = async () => {
    //Authentication
    const isLoggedIn = false

    if(isLoggedIn){
        let token = 'Bearer token'
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }else{
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
};

// Build Request
const buildRequest = async (method, body) =>{
    if(method === 'GET'){
        return {
            method: method,
            headers: await buildHeader(),
            credentials: 'omit'
        }
    }else{
        return {
            method: method,
            headers: await buildHeader(),
            body: JSON.stringify(body),
            credentials: 'omit'
        }
    }
};

// // Build Error
// const errorBuilder = (message,status) => {
//     return {
//         message: message,
//         status: status,
//     }
// };

const postService = async (url, body) => {
    let data = await buildRequest("POST",body);
    return await restService(url,data);
};

const getService = async (url) => {
    let data = await buildRequest("GET", {});
    return await restService(url,data);
};

const putService = async (url,body) => {
    let data = await buildRequest("PUT",body);
    return await restService(url,data);
};

const deleteService = async (url,body) => {
    let data = await buildRequest("DELETE",body);
    return await restService(url,data);
};

const customRequest = async (url,method,headers,body) =>{
    const defaultHeader = buildHeader();
    let data = {
        method: method,
        headers: {
            ...defaultHeader,
            ...headers
        },
        body: JSON.stringify(body),
    };
    return await restService(url,data);
};

const restService = async (url,data) =>{
    let result = null;

    if (process.env.REACT_APP_ENVIRONMENT !== "production") {console.log(data);}

    const response = await fetch(url,data);
    result = await response.json();

    if (process.env.REACT_APP_ENVIRONMENT !== "production") {console.log(result);}
    return result;
};

export {
    postService,
    getService,
    putService,
    deleteService,
    customRequest,
};
