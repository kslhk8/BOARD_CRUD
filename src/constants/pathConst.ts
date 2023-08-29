/* 
* path const
* @property HOME 루트 페이자
* @property BOARD 게시판 목록
*/
const PATH_CONST = Object.freeze({
  HOME: '/',
  BOARD: "/board",
  NOT_FOUNF: '/notFound',
  MAINTAINANCE: '/maintainance'
})

const BOARD_PATH_CONST = Object.freeze({
  BOARD_LIST: PATH_CONST.BOARD,
  BOARD_DETAIL: (id: number) => `${PATH_CONST.BOARD}/${id}`,
  BOARD_ADD: (id: string) => `${PATH_CONST.BOARD}/edit/${id}`,
})

export { PATH_CONST, BOARD_PATH_CONST }
