import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {FOOD_ROUTE} from "../utils/consts";

const FoodItem = ({food}) => {
    const history = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history(FOOD_ROUTE + '/' + food.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + food.img} />
                <div className="text-black-50 d-flex justify-content-between mt-1">
                    <div>Рейтинг</div>
                    <div className="d-flex align-items-center">
                        <div>{food.rating}</div>
                        <Image width={16} height={16} src={star} />
                    </div>
                </div>
                <div>{food.name}</div>
            </Card>
        </Col>
    );
};

export default FoodItem;