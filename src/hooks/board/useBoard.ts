import { useParams, useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { toastMessage } from "~/components/Toast"
import { initialState } from "../input/useInput"
import useGetItem from "~/queries/useGetItem"
import useDeleteItem from "~/queries/useDelteItem"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
import { useCookies } from "react-cookie"
import { parseJwt } from "~/helper/parseJwt"

interface IBoard {
  showDeleteConfirmModal: boolean
  boardData: initialState
  onChangeModalState: () => void
  onDeleteItem: () => void
  onMoveEdit: () => void
  onMoveList: () => void
  isWriter: boolean
}
/**
 * @property showDeleteConfirmModal 삭제 확인 모달
 * @property boardData {title, content}
 * @property onChangeModalState 삭제 확인 모달의 onChange
 * @property onDeleteItem 게시글 삭제 function
 * @property onMoveEdit 게시글 편집 이동
 * @property onMoveList 리스트로 이동
 */
const useBoard = (): IBoard => {
  const [cookies] = useCookies()
  const token = cookies.accessToken
  const { sub: userId } = parseJwt(token)
  const router = useRouter()
  const params = useParams()
  const { data: boardData } = useGetItem(Number(params.id))
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const { mutateAsync: deleteItem } = useDeleteItem()

  const onChangeModalState = useCallback(() => {
    setShowDeleteConfirmModal(!showDeleteConfirmModal)
  }, [showDeleteConfirmModal])

  const onDeleteItem = useCallback(async () => {
    await deleteItem(Number(params.id))
    toastMessage("success", "게시글이 삭제됐습니다.")
    setShowDeleteConfirmModal(false)
    router.replace(BOARD_PATH_CONST.BOARD_LIST)
  }, [deleteItem, params.id, router])
  const onMoveEdit = useCallback(() => {
    router.push(BOARD_PATH_CONST.BOARD_EDIT(Number(params.id)))
  }, [params.id, router])
  const onMoveList = useCallback(() => {
    router.replace(BOARD_PATH_CONST.BOARD_LIST)
  }, [router])
  const isWriter = useMemo(
    () => userId === boardData.userId,
    [userId, boardData.userId]
  )
  return {
    showDeleteConfirmModal,
    boardData,
    onChangeModalState,
    onDeleteItem,
    onMoveEdit,
    onMoveList,
    isWriter,
  }
}

export default useBoard
