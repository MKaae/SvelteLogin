export async function fetchGet(url){
    let data;
    try{
        const response = await fetch(url,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            }
        });
        const result = await response.json();
        data = result.data;
    } catch (error) {
        console.error(error);
    }
    return data;
}

export async function fetchPost(url, body){
    let data;
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        data = result.data;
    } catch (error) {
        console.log(error)
    }
    return data;
}