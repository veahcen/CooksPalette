import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneFood, updateFoodRating, addToFavorite, isFoodInFavorites } from '../http/foodApi';
import Rating from '../components/modals/Rating';
import { Context } from "../index";

const FoodPage = () => {
    const [food, setFood] = useState({ info: [] });
    const { user } = useContext(Context)
    const { id } = useParams();
    const [rating, setRating] = useState(() => {
        const storedRating = localStorage.getItem(`rating-${id}`);
        return storedRating ? parseInt(storedRating) : 0;
    });
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                setIsFavorite(favorites.includes(id));

                const [foodData, favoriteStatus] = await Promise.all([
                    fetchOneFood(id),
                    isFoodInFavorites(id),
                ]);

                setFood(foodData);
                if (!localStorage.getItem(`rating-${id}`)) {
                    setRating(foodData.rating);
                }

                setIsFavorite(favoriteStatus);
                setIsLoading(false);
            } catch (error) {
                console.log('Ошибка при загрузке информации о продукте или проверке статуса избранности:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const addFavorite = () => {
        if (isLoading || isFavorite) {
            return;
        }

        const formData = new FormData();
        formData.append('foodId', id);

        addToFavorite(formData)
            .then((response) => {
                alert(`Товар ${food.name} был добавлен в избранное!`);

                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                localStorage.setItem('favorites', JSON.stringify([...favorites, id]));

                setIsFavorite(true);
            })
            .catch((error) => {
                console.log('Ошибка при добавлении еды в избранное:', error);
            });
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        updateFoodRating(id, newRating)
            .then((response) => {
                console.log('Рейтинг обновлен в базе данных:', response);
            })
            .catch((error) => {
                console.log('Ошибка при обновлении рейтинга:', error);
            });
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <Container>
                <Row className="mt-4">
                    <Col md={4}>
                        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + food.img} />
                    </Col>
                    <Col md={4}>
                        <Form className="d-flex flex-column align-items-center">
                            <h2>{food.name}</h2>
                            <Rating
                                initialRating={rating}
                                onChange={handleRatingChange}
                                name="size-large"
                                size="large"
                            />
                            <div
                                className="d-flex align-items-center justify-content-center mt-3"
                                style={{
                                    background: `url(${bigStar}) no-repeat center center`,
                                    width: 150,
                                    height: 150,
                                    backgroundSize: 'cover',
                                    fontSize: 44,
                                }}
                            >
                                {food.rating}
                            </div>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <Card
                            className="d-flex align-items-center justify-content-around"
                            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                        >
                            <h3 className="text-center">{food.name}</h3>
                            {isFavorite || user.user.role === 'ADMIN' ? (
                                <Button variant="outline-danger" disabled>
                                    Добавлено в избранное
                                </Button>
                            ) : (
                                <Button variant="outline-dark" onClick={addFavorite}>
                                    Добавить в избранное
                                </Button>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex flex-column mt-3">
                    <h1>Описание</h1>
                    {food.info.map((info, index) => (
                        <Row
                            key={info.id}
                            style={{
                                background: index % 2 === 0 ? 'lightgray' : 'transparent',
                                padding: 10,
                            }}
                        >
                            {info.description}: {info.ingredients}
                        </Row>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default FoodPage;
