import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import FoodList from "../components/FoodList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchFood, fetchTypes} from "../http/foodApi";
import Pages from "../components/Pages";

const Posts = observer(() => {
    const {food} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => food.setTypes(data))
        fetchFood(null,  1, 2).then(data => {
            food.setFoods(data.rows)
            food.setTotalCount(data.count)
        }
        )
    }, [])
        //food.totalCount
    useEffect(() => {
        fetchFood(food.selectedType.id, food.page, 2).then(data => {
            food.setFoods(data.rows)
            food.setTotalCount(data.count)
        })
    }, [food.page, food.selectedType])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <FoodList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Posts;