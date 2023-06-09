import Admin from "./pages/Admin";
import {ADMIN_ROUTE, FAVORITE_ROUTE, FOOD_ROUTE, LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Favorite from "./pages/Favorite";
import FoodPage from "./pages/FoodPage";
import Posts from "./pages/Posts";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin // по url admin будет вызыватся его компонент
    },
    {
        path: FAVORITE_ROUTE,
        Component: Favorite
    },
]
// для разграничения перехождения по стр
export const publicRoutes = [
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: FOOD_ROUTE + '/:id',
        Component: FoodPage
    },
]