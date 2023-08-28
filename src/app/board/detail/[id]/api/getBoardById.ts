export async function getBoardById(id: string) {
    const response = await fetch(`http://localhost:9999/boards/${id}`)
    const board = (await response.json())
    return board;
}
