/**
 * request headers option
 */
const HEADER_CONST = Object.freeze({
  CONTENT_TYPE: "Content-Type",
  APPLICATION_JSON: "application/json",
})
/**
 * HTTP method
 */
const CRUD_CONST = Object.freeze({
  GET: "get",
  POST: "post",
})
/**
 * pagination const
 * limit: page당 보여질 개수
 */
const PAGINATION_CONST = Object.freeze({
  LIMIT: 5,
})
/**
 * api address
 * @property LOGIN 로그인
 * @property REGISTER 회원가입
 * @property BOARD 게시글 목록
 * @property BOARD_DETAIL 게시글 상세
 * @property BOARD_DELETE 게시글 삭제
 * @property BOARD_UPDATE 게시글 편집
 */
const API_CONST = Object.freeze({
  LOGIN: "/login",
  REGISTER: "/register",
  BOARD: "/boards",
  BOARD_DETAIL: (id: number) => `${API_CONST.BOARD}/${id}`,
  BOARD_DELETE: (id: number) => `${API_CONST.BOARD}/${id}`,
  BOARD_UPDATE: (id: number) => `${API_CONST.BOARD}/${id}`,
})

export { HEADER_CONST, CRUD_CONST, API_CONST, PAGINATION_CONST }
