import { useRouter } from "next/navigation"
import React, { useCallback, useMemo, useState } from "react"
import { BOARD_PATH_CONST, PATH_CONST } from "~/constants/pathConst"
import usePostItem, { PostItemParamType } from "~/queries/usePostItem"

/*
 * @property title 게시글 제목
 * @property content 게시글 내용
 * TODO: 주루루룩 다 적어
 */
interface IBoardAdd {
  title: string
  content: string
  showAddConfirmModal: boolean
  isDataReady: boolean
  onChangeTitle: (event: any) => void
  onChangeContent: (event: any) => void
  onChangeModalState: () => void
  onPostItem: (params: PostItemParamType) => void
}
const useBoardAdd = (): IBoardAdd => {
  const router = useRouter()
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { mutateAsync: postItem } = usePostItem()

  // TODO(참고): input change custom hook
  const onChangeTitle = useCallback((event: any) => {
    setTitle(event.target.value)
  }, [])

  // TODO(참고): input change custom hook
  const onChangeContent = useCallback((event: any) => {
    setContent(event.target.value)
  }, [])

  const onChangeModalState = useCallback(() => {
    setShowAddConfirmModal(!showAddConfirmModal)
  }, [showAddConfirmModal])

  const onPostItem = useCallback(
    async ({ title, content, date }: PostItemParamType) => {
      const { data } = await postItem({ title, content, date })
      console.log(data);
      // TODO:지역변수는 이 아래에서 만들기
      setShowAddConfirmModal(false)
      router.replace(BOARD_PATH_CONST.BOARD_DETAIL(data.id))
    },
    []
  )

  const isDataReady = useMemo(
    () => !!title.length && !!content.length,
    [title.length, content.length]
  )
  return {
    title,
    content,
    showAddConfirmModal,
    isDataReady,
    onChangeTitle,
    onChangeContent,
    onChangeModalState,
    onPostItem,
  }
}

export default useBoardAdd
