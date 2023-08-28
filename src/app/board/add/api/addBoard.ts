type dataType = {
    title: string,
    content: string
}
export async function addBoard(data: dataType) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: data.title,
            content: data.content,
            date: new Date()
        })
    };
    const response = await fetch('http://localhost:9998/boards', options);
    if (!response.ok) {
        throw new Error('Failed');
    }
    return await response.json();
}