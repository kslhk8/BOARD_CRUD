import { useState, useCallback, ChangeEvent } from "react"

/**
 * @property {title} 게시글 타이틀
 * @property {content} 게시글 내용
 */
type initialState = { title?: string; content?: string }

type eventType = ChangeEvent<HTMLInputElement> &
  ChangeEvent<HTMLTextAreaElement>
/**
 *
 * @param initialForm form 초기 데이터
 * @property form form 데이터
 * @property onChange input값 변화에 따른 handler
 * @property reset input값 초기화
 */
function useInput(
  initialForm: initialState
): [initialState, (e: eventType) => void, () => void] {
  const [form, setForm] = useState(initialForm)
  const onChange = useCallback((event: eventType) => {
    const { name, value } = event.target
    setForm((form) => ({ ...form, [name]: value }))
  }, [])
  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset]
}

export default useInput
export type { initialState, eventType }
