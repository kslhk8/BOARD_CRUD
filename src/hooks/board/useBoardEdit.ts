import { useParams, useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { toastMessage } from "~/components/Toast"
import useInput, { initialState, eventType } from "../input/useInput"
import useGetItem from "~/queries/useGetItem"
import useUpdateItem from "~/queries/useUpdateItem"
import { BOARD_PATH_CONST } from "~/constants/pathConst"

interface IBoardEdit {
  showEditConfirmModal: boolean
  isDataReady: boolean
  form: initialState
  onChange: (event: eventType) => void
  onChangeModalState: () => void
  onUpdateItem: () => void
  onMoveBack: () => void
}
/**
 * @property showEditConfirmModal 편집 확인 모달
 * @property isDataReady title과 content가 있는지 확인
 * @property form {title, content}
 * @property onChange title, content에 대한 onChange event
 * @property onChangeModalState 편집 확인 모달의 onChange
 * @property onUpdateItem 게시글 편집 function
 * @property onMoveBack 뒤로 가기 function
 *
 */
const useBoardEdit = (): IBoardEdit => {
  const router = useRouter()
  const params = useParams()

  const { data: boardData } = useGetItem(Number(params.id))
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false)
  const { mutateAsync: updateItem } = useUpdateItem()
  const [form, onChange] = useInput({
    title: boardData.title || "",
    content: boardData.content || "",
  })

  const onChangeModalState = useCallback(() => {
    setShowEditConfirmModal(!showEditConfirmModal)
  }, [showEditConfirmModal])

  const onUpdateItem = useCallback(async () => {
    const { data } = await updateItem({
      title: form.title + "",
      content: form.content + "",
      date: new Date() + "",
      id: Number(params.id),
    })
    toastMessage("success", "게시글 편집이 완료됐습니다.")
    setShowEditConfirmModal(false)
    router.replace(BOARD_PATH_CONST.BOARD_DETAIL(Number(data.id)))
  }, [updateItem, form.title, form.content, params.id, router])
  const isDataReady = useMemo(
    () => !!form.title && !!form.content,
    [form.title, form.content]
  )
  const onMoveBack = useCallback(() => {
    router.back()
  }, [router])
  return {
    showEditConfirmModal,
    isDataReady,
    form,
    onChange,
    onChangeModalState,
    onUpdateItem,
    onMoveBack,
  }
}

export default useBoardEdit
