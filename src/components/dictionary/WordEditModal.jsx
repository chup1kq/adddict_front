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
                                  originalPlaceholder = "Введите слово",
                                  translationLabel = "Перевод",
                                  translationPlaceholder = "Введите перевод",
                                  cancelText = "Отмена",
                                  saveText = "Сохранить",
                                  initialOriginal = "",
                                  initialTranslation = "",
                                  showCheckbox = false,
                                  checkboxLabel = "Дополнительная опция",
                                  initialChecked = false
                              }) => {
    const [original, setOriginal] = useState(initialOriginal);
    const [translation, setTranslation] = useState(initialTranslation);
    const [checked, setChecked] = useState(initialChecked);

    useEffect(() => {
        if (show) {
            setOriginal(initialOriginal);
            setTranslation(initialTranslation);
            setChecked(initialChecked);
        }
    }, [show, initialOriginal, initialTranslation, initialChecked]);

    const handleSave = () => {
        onSave({
            original: original.trim(),
            translation: translation.trim(),
            ...(showCheckbox && { checked })
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
                        placeholder={originalPlaceholder}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{translationLabel}</Form.Label>
                    <Form.Control
                        type="text"
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        placeholder={translationPlaceholder}
                    />
                </Form.Group>
                {showCheckbox && (
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label={checkboxLabel}
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                    </Form.Group>
                )}
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
    originalPlaceholder: PropTypes.string,
    translationPlaceholder: PropTypes.string,
    cancelText: PropTypes.string,
    saveText: PropTypes.string,
    initialOriginal: PropTypes.string,
    initialTranslation: PropTypes.string,
    showCheckbox: PropTypes.bool,
    checkboxLabel: PropTypes.string,
    initialChecked: PropTypes.bool
};