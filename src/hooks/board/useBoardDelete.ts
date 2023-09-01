import { useParams, useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toastMessage } from "~/components/Toast"
import useInput, { initialState, eventType } from '../input/useInput'
import useGetItem from "~/queries/useGetItem"
import useDeleteItem from "~/queries/useDelteItem"
/*
 * @property showDeleteConfirmModal 삭제 확인 모달
 * @property form {title, content}
 * @property onChangeModalState 삭제 확인 모달의 onChange
 * @property onDeleteItem 게시글 삭제 function 
 * @property onMoveEdit 게시글 편집 이동
 * 
 * 
 */

interface IBoardDelete {
    showDeleteConfirmModal: boolean
    form: initialState
    onChangeModalState: () => void
    onDeleteItem: () => void
    onMoveEdit: () => void
}


const useBoardDelete = (): IBoardDelete => {
    const router = useRouter()
    const params = useParams();
    const { data: boardData } = useGetItem(Number(params.id));
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const { mutateAsync: deleteItem } = useDeleteItem()

    const [form, onChange, reset] = useInput({ title: boardData.title || '', content: boardData.content || '' })
    const onChangeModalState = useCallback(() => {
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }, [showDeleteConfirmModal])

    const onDeleteItem = useCallback(
        async () => {
            await deleteItem(Number(params.id))
            // TODO:지역변수는 이 아래에서 만들기
            toastMessage('success', '게시글이 삭제됐습니다.');
            setShowDeleteConfirmModal(false);
            router.replace(`/board/list`)
        },
        []
    )
    const onMoveEdit = useCallback(() => {
        router.push(`/board/edit/${params.id}`)
    }, [])
    return {
        showDeleteConfirmModal,
        form,
        onChangeModalState,
        onDeleteItem, onMoveEdit
    }
}

export default useBoardDelete
