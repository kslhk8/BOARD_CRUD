export async function getBoards() {
    const response = await fetch('http://localhost:9998/boards');
    const boards = (await response.json())
    return boards;
}
