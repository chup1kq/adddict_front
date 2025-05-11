import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ConfirmationWindow = ({
            show,
            onCancel,
            onConfirm,
            title = "Подтвердите действие",
            message = "Продолжить?",
            confirmText = "Продолжить",
            cancelText = "Отмена"
        }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton style={{ borderBottom: '1px solid #f8edeb' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '1px solid #f8edeb' }}>
                <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                    style={{
                        color: '#6c757d',
                        borderColor: '#d4a373'
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    style={{
                        backgroundColor: '#d4a373',
                        borderColor: '#d4a373',
                        color: 'white'
                    }}
                >
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ConfirmationWindow.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};