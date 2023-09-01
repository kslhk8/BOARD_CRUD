import { useRouter } from "next/navigation"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
import usePostItem from "~/queries/usePostItem"
import { toastMessage } from "~/components/Toast"
import useInput, { initialState, eventType } from '../input/useInput'
/*
 * @property showAddConfirmModal 등록 확인 모달
 * @property isDataReady title과 content가 있는지 확인
 * @property form {title, content}
 * @property onChange title, content에 대한 onChange event
 * @property onChangeModalState 등록 확인 모달의 onChange
 * @property onPostItem 게시글 등록 function 
 * 
 * 
 */
interface IBoardAdd {
  showAddConfirmModal: boolean
  isDataReady: boolean
  form: initialState
  onChange: (event: eventType) => void
  onChangeModalState: () => void
  onPostItem: () => void
}
const useBoardAdd = (): IBoardAdd => {
  const router = useRouter()
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false)
  const { mutateAsync: postItem } = usePostItem()
  const [form, onChange, reset] = useInput({ title: '', content: '' })
  const onChangeModalState = useCallback(() => {
    setShowAddConfirmModal(!showAddConfirmModal)
  }, [showAddConfirmModal])

  const onPostItem = useCallback(
    async () => {
      console.log(form.title, form.content, 'check')
      const { data } = await postItem({ title: form.title + '', content: form.content + '', date: new Date() + '' })
      toastMessage('success', '게시글이 등록됐습니다.');
      setShowAddConfirmModal(false)
      router.replace(BOARD_PATH_CONST.BOARD_DETAIL(data.id))
    },
    [form.title, form.content]
  )

  const isDataReady = useMemo(
    () => !!form.title && !!form.content,
    [form.title, form.content]
  )
  return {
    showAddConfirmModal,
    isDataReady,
    form,
    onChange,
    onChangeModalState,
    onPostItem,
  }
}

export default useBoardAdd
