import React, { useContext, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import CreateFood from '../components/modals/CreateFood';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { getFavorite, removeFromFavorite } from '../http/foodApi';
import { Link } from 'react-router-dom';
import { FOOD_ROUTE } from '../utils/consts';

const Favorite = observer(() => {
    const [foodVisible, setFoodVisible] = useState(false);

    const { food } = useContext(Context);

    useEffect(() => {
        getFavorite().then((data) => food.setFavorites(data));
    }, []);

    const handleRemoveFromFavorite = async (foodId) => {
        try {
            await removeFromFavorite(foodId);
            // Обновляем список избранных объектов после удаления
            const updatedFavorites = food.favorites.filter((favorite) => favorite.food.id !== foodId);
            food.setFavorites(updatedFavorites);
        } catch (error) {
            console.log('Ошибка при удалении из избранного:', error);
            console.log(foodId)
        }
    };

    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className="mt-4 p-2" onClick={() => setFoodVisible(true)}>
                Добавить еду
            </Button>
            <CreateFood show={foodVisible} onHide={() => setFoodVisible(false)} />
            <h3 className="mt-5" style={{ textAlign: 'center' }}>
                Избранное
            </h3>

            {food.favorites.map((product) => (
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                        <Row className="d-flex w-100">
                            <Col>
                                <Link to={FOOD_ROUTE + '/' + product.food.id} className="text-decoration-none text-dark">
                                <div className="d-flex flex-row align-items-center">
                                    <img src={process.env.REACT_APP_API_URL + product.food.img} width={50} alt="Food" />
                                    <h1 className="pl-3">{product.food.name}</h1>
                                </div>
                                </Link>
                            </Col>
                        </Row>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromFavorite(product.food.id)}
                        className="mt-2"
                    >
                        Удалить из избранного
                    </Button>
                </Card>
            ))}
        </Container>
    );
});

export default Favorite;
