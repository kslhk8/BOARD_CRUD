const HEADER_CONST = Object.freeze({
  CONTENT_TYPE: "Content-Type",
  APPLICATION_JSON: "application/json",
})

const CRUD_CONST = Object.freeze({
  GET: "get",
  POST: "post",
})

// api 주소
const API_CONST = Object.freeze({
  BOARD: "/boards",
  BOARD_DETAIL: (id: number) => `${API_CONST.BOARD}/${id}`,
  BOARD_DELETE: (id: number) => `${API_CONST.BOARD}/${id}`,
  BOARD_UPDATE: (id: number) => `${API_CONST.BOARD}/${id}`,
})

export { HEADER_CONST, CRUD_CONST, API_CONST }
