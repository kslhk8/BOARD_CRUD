import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
import usePostItem from "~/queries/usePostItem"
import { toastMessage } from "~/components/Toast"
import useInput, { initialState, eventType } from "../input/useInput"
import { useCookies } from "react-cookie"
import { parseJwt } from "~/helper/parseJwt"

interface IBoardAdd {
  showAddConfirmModal: boolean
  isDataReady: boolean
  form: initialState
  onChange: (event: eventType) => void
  onChangeModalState: () => void
  onPostItem: () => void
  onMoveBack: () => void
}
/**
 * @property showAddConfirmModal 등록 확인 모달
 * @property isDataReady title과 content가 있는지 확인
 * @property form {title, content}
 * @property onChange title, content에 대한 onChange event
 * @property onChangeModalState 등록 확인 모달의 onChange
 * @property onPostItem 게시글 등록 function
 * @property onMoveBack 뒤로 가기 function
 */
const useBoardAdd = (): IBoardAdd => {
  const router = useRouter()
  const [cookies] = useCookies()
  const token = cookies.accessToken
  const { sub: userId } = parseJwt(token)
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false)
  const { mutateAsync: postItem } = usePostItem()
  const [form, onChange] = useInput({ title: "", content: "" })
  const onChangeModalState = useCallback(() => {
    setShowAddConfirmModal(!showAddConfirmModal)
  }, [showAddConfirmModal])

  const onPostItem = useCallback(async () => {
    const { data } = await postItem({
      title: form.title + "",
      content: form.content + "",
      date: new Date() + "",
      userId,
    })
    toastMessage("success", "게시글이 등록됐습니다.")
    setShowAddConfirmModal(false)
    router.replace(BOARD_PATH_CONST.BOARD_DETAIL(data.id))
  }, [form.title, form.content, postItem, router, userId])

  const isDataReady = useMemo(
    () => !!form.title && !!form.content,
    [form.title, form.content]
  )
  const onMoveBack = useCallback(() => {
    router.back()
  }, [router])
  return {
    showAddConfirmModal,
    isDataReady,
    form,
    onChange,
    onChangeModalState,
    onPostItem,
    onMoveBack,
  }
}

export default useBoardAdd
