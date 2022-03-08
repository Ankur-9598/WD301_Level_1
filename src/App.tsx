import React, { useState } from 'react';
import AppContainer from './AppContainer';
import Form from './Form';
import Header from './Header';
import Home from './Home';


function App() {
    const [state, setState] = useState("home");
    const changeState = (value: string) => setState(value);

    return (
        <AppContainer>
            <div className="mx-auto p-5 bg-white rounded-xl shadow-lg">
                <Header
                    title={"Welcome to react-typescript with tailwindcss course"}
                />
                { state === "home"
                    ? <Home changeStateCB={changeState}/> 
                    : <Form changeStateCB={changeState} />
                }
            </div>
        </AppContainer>
    );
}

export default App;
