interface ModalProps {
    title?: string;
    close?: string;
    confirm?: string;
    onClose: () => void;
    onConfirm?: () => void;
}


export default function Modal({
    title,
    close,
    confirm,
    onClose,
    onConfirm,
}: ModalProps) {
    return (
        <>
            <div className="modal-container">
                <div className="title">{title}</div>
                <div className="btn-wrapper">
                    <div onClick={onClose} className="close">
                        {close}
                    </div>
                    <div onClick={onConfirm} className="confirm">
                        {confirm}
                    </div>
                </div>
            </div>
            <div className="overlay" onClick={onClose} />
        </>
    );
}
