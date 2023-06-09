import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import DeleteType from "../components/modals/DeleteType";
import CreateFood from "../components/modals/CreateFood";
import DeleteFood from "../components/modals/DeleteFood";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [typeDelVisible, setTypeDelVisible] = useState(false)
    const [foodVisible, setFoodVisible] = useState(false)
    const [foodDelVisible, setFoodDelVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип</Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeDelVisible(true)}
            >
                Удалить тип</Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setFoodVisible(true)}
            >
                Добавить еду
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setFoodDelVisible(true)}
            >
                Удалить еду
            </Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <DeleteType show={typeDelVisible} onHide={() => setTypeDelVisible(false)} />
            <CreateFood show={foodVisible} onHide={() => setFoodVisible(false)} />
            <DeleteFood show={foodDelVisible} onHide={() => setFoodDelVisible(false)} />
        </Container>
    );
};

export default Admin;