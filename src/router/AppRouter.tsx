import React from "react";
import { useRoutes } from "raviger";

import AppContainer from "../AppContainer";
import { User } from "../functions/types/User";

import About from "../components/About";
import Login from "../components/Login";
import LazyLoading from "../components/common/LazyLoading";

const Home = React.lazy(() => import("../components/Home"));
const Form = React.lazy(() => import("../components/Form"));
const Preview = React.lazy(() => import("../components/preview/Preview"));
const PreviewHome = React.lazy(() => import("../components/preview/Home"));

const routes = {
    "/": () => <LazyLoading><Home /></LazyLoading>,
    "/login": () => <Login />,
    "/about": () => <About />,
    "/forms/:id": ({id}: {id: string}) => <LazyLoading><Form formId={Number(id)} /></LazyLoading>,
    "/preview/:id": ({id}: {id: string}) => <LazyLoading><PreviewHome formId={Number(id)} /></LazyLoading>,
    "/preview/:id/submission": ({id}: {id: string}) => <LazyLoading><Preview formId={Number(id)} /></LazyLoading>,
}

export default function AppRouter(props: {user: User}) {
    let routeResult = useRoutes(routes);
    return (
        <AppContainer user={props.user}>
            {routeResult}
        </AppContainer>
    );
}