export async function fetchResponse(url, options) {
    //token 없을 경우
    // if(!localStorage.getItem('token')) throw new Error('Failed');
    const response = await fetch(url, {...options, headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }})
    if (!response.ok) {
        throw new Error('Failed');
    }
    return await response.json();
}
