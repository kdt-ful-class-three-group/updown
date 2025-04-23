export const GetFetch = async (url, method, postData) => {
return fetch(`http://localhost:${url}`, {
        method: method,
        headers: { 
        "Content-Type": "application/json",
        },
        body: JSON.stringify({postData})
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(`${err} 에러발생`));
}