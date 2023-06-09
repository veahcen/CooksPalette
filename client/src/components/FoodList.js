import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import FoodItem from './FoodItem';

const FoodList = observer(() => {
    const { food } = useContext(Context);

    // Если есть результаты поиска, отображаем их, иначе отображаем все продукты
    const foodsToDisplay = food.searchResults.length > 0 ? food.searchResults : food.foods;

    return (
        <Row className="d-flex">
            {foodsToDisplay.map((food) => (
                <FoodItem key={food.id} food={food} />
            ))}
        </Row>
    );
});

export default FoodList;
