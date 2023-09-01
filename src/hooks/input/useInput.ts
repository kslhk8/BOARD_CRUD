import { useState, useCallback, ChangeEvent, ChangeEventHandler } from 'react';
type initialState = { title?: string, content?: string }
type eventType = (ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>)
function useInput(initialForm: initialState): [initialState, (e: eventType) => void, () => void] {
    const [form, setForm] = useState(initialForm)
    // change
    // const onChange = useCallback((event: ChangeEvent<HTMLInputElement> & ChangeEventHandler<HTMLTextAreaElement>) => {
    const onChange = useCallback((event: eventType) => {
        const { name, value } = event.target;
        setForm(form => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInput;
export type { initialState, eventType };