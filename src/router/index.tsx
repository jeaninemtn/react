import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import TicTacToe from "../pages/TicTacToe";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            { index: true, element: <Home/> },
            { path: "tictactoe", element: <TicTacToe/> },
        ]
    }

]);

export default router;