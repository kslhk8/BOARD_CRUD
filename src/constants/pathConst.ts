/* 
* path const
* @property HOME 루트 페이자
* @property BOARD 게시판 목록
*/
const PATH_CONST = Object.freeze({
  HOME: '/',
  BOARD: "/board",
  NOT_FOUND: '/not-found',
  MAINTAINANCE: '/maintainance'
})

const BOARD_PATH_CONST = Object.freeze({
  BOARD_LIST: `${PATH_CONST.BOARD}/list`,
  BOARD_DETAIL: (id: number) => `${PATH_CONST.BOARD}/${id}`,
  BOARD_ADD: `${PATH_CONST.BOARD}/add`,
})

export { PATH_CONST, BOARD_PATH_CONST }
