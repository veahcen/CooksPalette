import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {POSTS_ROUTE} from "../utils/consts";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)


    return (
        <Routes>
            {/* // вытаскиваем из массива путь и компонент для авторизованного */}
            {/*отрисовываем в роут путь и компонент*/}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {/*для редиректа на основную страницу, если не один маршрут не отрабатывает*/}
            <Route path='*' element={<Navigate to={POSTS_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;