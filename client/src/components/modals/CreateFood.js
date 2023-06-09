import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createFood, fetchFood, fetchTypes} from "../../http/foodApi";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {values} from "mobx";


const CreateFood = observer(({show, onHide}) => {
    const {food} = useContext(Context)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => food.setTypes(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {description: '', ingredients: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addFood = () => {
        const formData = new FormData()
        if (!name) {
            alert("Вы не ввели название")
            return;
        }
        formData.append('name', name)
        formData.append('img', file)
        formData.append('typeFoodId', food.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createFood(formData).then(data => onHide())
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
                    Добавить рецепт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 md-2">
                        <Dropdown.Toggle>
                            {food.selectedType.name_type || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {food.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => food.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name_type}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Название блюда"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >Добавить описание
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Название"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.ingredients}
                                    onChange={(e) => changeInfo('ingredients', e.target.value, i.number)}
                                    placeholder="Описание"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant="outline-danger"
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addFood}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateFood;