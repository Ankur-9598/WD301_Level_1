import React from 'react';
import Header from './components/Header';

export default function AppContainer(props: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen items-center bg-gray-100">
            <div className="mx-auto w-3/4 max-w-[700px] p-5 bg-white rounded-xl shadow-lg">
                <Header />
                {props.children}
            </div>
        </div>
    )
}
