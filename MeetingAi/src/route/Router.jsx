import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AgendaPage from "../pages/agendaPage/AgendaPage";

import HomePage from "../pages/home/HomePage";
import SumPage from "../pages/sumPage/SumPage";
import InvitePage from "../pages/invitePage/InvitePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/invite",
        element: <InvitePage />,
    },
    {
        path: "/agenda",
        element: <AgendaPage />,
    },
    {
        path: "/sum",
        element: <SumPage />,
    },
]);

export default router;
