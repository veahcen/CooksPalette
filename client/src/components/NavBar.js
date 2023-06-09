import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { Navbar, Container, Form, Nav, Button } from 'react-bootstrap';
import {ADMIN_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, POSTS_ROUTE} from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user, food } = useContext(Context);
    const [name, setName] = useState('');
    const history = useNavigate();

    const handleSearch = () => {
        const filteredFoods = food.foods.filter((food) => food.name.toLowerCase().includes(name.toLowerCase()));
        food.setSearchResults(filteredFoods);
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={POSTS_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                      <span style={{ backgroundColor: '#4361EE', padding: '4px 8px', borderRadius: '4px' }}>
                        Cook's
                      </span>
                    <span style={{ color: '#4361EE' }}>Palette</span>
                </NavLink>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="outline-success" onClick={handleSearch}>
                        Поиск
                    </Button>
                </Form>
                {user.isAuth && user.user.role === 'ADMIN' ? ( // Проверяем на авторизацию и роль "ADMIN"
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => history(ADMIN_ROUTE)}>
                            Админ панель
                        </Button>
                        <Button variant={'outline-light'} onClick={() => logOut()} style={{ margin: '0 0 0 10px' }} className="ml-4">
                            Выйти
                        </Button>
                    </Nav>
                ) : user.isAuth ? ( // Проверяем только на авторизацию
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => history(FAVORITE_ROUTE)}>
                            Панель пользователя
                        </Button>
                        <Button variant={'outline-light'} onClick={() => logOut()} style={{ margin: '0 0 0 10px' }} className="ml-4">
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => history(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
