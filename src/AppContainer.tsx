import React from 'react';
import Header from './components/Header';
import { User } from './functions/types/User';

export default function AppContainer(props: { user: User, children: React.ReactNode }) {

    const childrenWithProps = React.Children.map(props.children, child => {
        if(React.isValidElement(child)) {
            return React.cloneElement(child, {user: props.user});
        }
        return child;
    })
    return (
        <div className="flex h-screen items-center bg-gray-100">
            <div className="mx-auto w-3/4 max-w-[700px] p-5 bg-white rounded-xl shadow-lg">
                <Header user={props.user} />
                {childrenWithProps}
            </div>
        </div>
    )
}
