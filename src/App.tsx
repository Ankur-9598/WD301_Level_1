import React, { useEffect, useState } from 'react';
import { me } from './functions/ApiCalls';
import { User } from './functions/types/User';
import AppRouter from './router/AppRouter';


function App() {
    const [user, setUser] = useState<User>({
        username: ""
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            const user: User = await me();
            setUser(user);
        }
        getCurrentUser();
    }, []);

    return <AppRouter user={user} />
}

export default App;
