import React from 'react';
import logo from '../logo.svg';

export default function Home(props: {changeStateCB: (value: string) => void}) {
    return (
        <>
            <div className="flex gap-4">
                <img src={logo} alt="app-logo" className="animate-spin w-32 h-32" />
                <span className="w-full self-center text-center font-bold text-xl">Welcome Home</span>
            </div>
            <button onClick={() => props.changeStateCB("form")} className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3">Open Form</button>
        </>
    );
}
