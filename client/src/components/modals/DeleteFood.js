import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteFood } from "../../http/foodApi";

const DeleteFood = ({ show, onHide }) => {
    const [foodId, setFoodId] = useState('');

    const handleDelete = () => {
        if (!foodId) {
            alert("Вы не ввели ID еды");
            return;
        }
        deleteFood(foodId)
            .then(data => {
                setFoodId('');
                onHide();
            })
            .catch(error => {
                console.error("Ошибка при удалении еды:", error);
                // Обработка ошибки при удалении
            });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить еду
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={foodId}
                        onChange={e => setFoodId(e.target.value)}
                        placeholder={"Введите ID еды"}
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

export default DeleteFood;
