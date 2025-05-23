import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../static/styles/dictionaryWindows/ConfirmationWindow.css';

export const ConfirmationWindow = ({
                                       show,
                                       onCancel,
                                       onConfirm,
                                       title = "Подтвердите действие",
                                       message = "Продолжить?",
                                       confirmText = "Продолжить",
                                       cancelText = "Отмена",
                                       confirmVariant = "danger", // 'neutral' или 'danger'
                                       cancelVariant = "outline"   // 'outline' или 'filled'
                                   }) => {
    return (
        <Modal show={show} onHide={onCancel} centered className="confirmation-modal">
            <Modal.Header closeButton className="confirmation-header">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="confirmation-body">
                {message}
            </Modal.Body>
            <Modal.Footer className="confirmation-footer">
                <Button
                    onClick={onCancel}
                    className={`confirmation-button cancel-button ${cancelVariant}`}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    className={`confirmation-button confirm-button ${confirmVariant}`}
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
    cancelText: PropTypes.string,
    confirmVariant: PropTypes.oneOf(['neutral', 'danger']),
    cancelVariant: PropTypes.oneOf(['outline', 'filled'])
};