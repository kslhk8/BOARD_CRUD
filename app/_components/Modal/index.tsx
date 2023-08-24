import styles from './modal.module.scss'
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
            <div className={styles.box}>
                <div className={styles.guide}>
                    <div className={styles.modalTitle}>{title}</div>
                </div>
                <div className={styles.btn}>
                    <div onClick={onClose} className={styles.close}>
                        {close}
                    </div>
                    <button onClick={onConfirm} className={styles.confirm}>
                        {confirm}
                    </button>
                </div>
            </div>
            <div className={styles.overlay} onClick={onClose} />
        </>
    );
}
