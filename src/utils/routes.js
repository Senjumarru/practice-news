import { Home } from '../pages/Home';
import { Categories } from "../pages/Categories.jsx";
import { NewsDetail } from "../pages/NewsDetail.jsx";

import { HOME_PAGE, CATEGORIES_PAGE, NEWS_DETAIL_PAGE} from "./consts.js";

export const routes = [
    {
        path: HOME_PAGE,
        element: Home
    },
    {
        path: CATEGORIES_PAGE,
        element: Categories
    },
    {
        path: NEWS_DETAIL_PAGE,
        element: NewsDetail
    }
];