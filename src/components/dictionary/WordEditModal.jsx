import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../static/styles/dictionaryWindows/WordEditModal.css';
import {useEffect, useState} from "react";

export const WordEditModal = ({
                                  show,
                                  onCancel,
                                  onSave,
                                  title = "Редактирование слова",
                                  originalLabel = "Слово",
                                  translationLabel = "Перевод",
                                  cancelText = "Отмена",
                                  saveText = "Сохранить",
                                  initialOriginal = "",
                                  initialTranslation = ""
                              }) => {
    const [original, setOriginal] = useState(initialOriginal);
    const [translation, setTranslation] = useState(initialTranslation);

    useEffect(() => {
        setOriginal(initialOriginal);
        setTranslation(initialTranslation);
    }, [initialOriginal, initialTranslation]);

    const handleSave = () => {
        onSave({
            original: original.trim(),
            translation: translation.trim()
        });
    };

    return (
        <Modal show={show} onHide={onCancel} centered className="word-edit-modal">
            <Modal.Header closeButton className="word-edit-header">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="word-edit-body">
                <Form.Group className="mb-3">
                    <Form.Label>{originalLabel}</Form.Label>
                    <Form.Control
                        type="text"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        placeholder="Введите слово"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{translationLabel}</Form.Label>
                    <Form.Control
                        type="text"
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        placeholder="Введите перевод"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="word-edit-footer">
                <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                    className="word-edit-cancel"
                >
                    {cancelText}
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!original.trim() || !translation.trim()}
                    className="word-edit-save"
                >
                    {saveText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

WordEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    title: PropTypes.string,
    originalLabel: PropTypes.string,
    translationLabel: PropTypes.string,
    cancelText: PropTypes.string,
    saveText: PropTypes.string,
    initialOriginal: PropTypes.string,
    initialTranslation: PropTypes.string
};