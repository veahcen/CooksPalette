import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {food} = useContext(Context)
    return (
        <ListGroup>
            {food.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === food.selectedType.id}
                    onClick={() => food.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name_type}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;