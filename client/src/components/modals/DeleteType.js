import React, { useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {deleteType} from "../../http/foodApi";

const DeleteType = ({ show, onHide}) => {
    const [value, setValue] = useState('')
    const handleDelete = () => {
        if (!value) {
            alert("Вы не ввели название типа")
            return;
        }
        deleteType({name_type: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;
