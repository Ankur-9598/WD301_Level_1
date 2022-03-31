import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import About from "../components/About";
import Form from "../components/Form";
import Home from "../components/Home";
import Login from "../components/Login";
import Preview from "../components/Preview";
import { User } from "../functions/types/User";

const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "/about": () => <About />,
    "/forms/:id": ({id}: {id: string}) => <Form formId={Number(id)} />,
    "/preview/:id": ({id}: {id: string}) => <Preview formId={Number(id)} />,
}

export default function AppRouter(props: {user: User}) {
    let routeResult = useRoutes(routes);
    return (
        <AppContainer user={props.user}>
            {routeResult}
        </AppContainer>
    );
}