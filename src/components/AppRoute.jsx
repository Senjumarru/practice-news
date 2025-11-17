import {BrowserRouter, Routes, Route} from "react-router-dom";
import {routes} from "../utils/routes.js";

export function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.element />} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}