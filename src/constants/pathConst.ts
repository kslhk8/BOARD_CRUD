/**
 * PATH_CONST
 * @property HOME 루트 페이지
 * @property BOARD 게시판
 * @property NOT_FOUND 404 페이지
 * @property MAINTAINANCE 서버 에러 페이지
 */
const PATH_CONST = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOARD: "/board",
  NOT_FOUND: "/not-found",
  MAINTAINANCE: "/maintainance",
})

/**
 * BOARD_PATH_CONST
 * @property BOARD_LIST 게시판 목록
 * @property BOARD_ADD 게시글 추가
 * @property BOARD_DETAIL 게시판 상세
 * @property BOARD_EDIT 게시글 편집
 */
const BOARD_PATH_CONST = Object.freeze({
  BOARD_LIST: `${PATH_CONST.BOARD}/list`,
  BOARD_ADD: `${PATH_CONST.BOARD}/add`,
  BOARD_DETAIL: (id: number) => `${PATH_CONST.BOARD}/${id}`,
  BOARD_EDIT: (id: number) => `${PATH_CONST.BOARD}/edit/${id}`,
})

export { PATH_CONST, BOARD_PATH_CONST }
