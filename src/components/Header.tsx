import React from 'react';
import logo from '../logo.svg';

export default function Header(props: {title: string}) {
    return (
        <div className="flex gap-2 items-center">
            <img 
                src={logo}
                className="w-16 h-16 animate-spin" 
                style={{ animation: "spin 2s linear infinite" }} 
                alt="logo" 
            />
            <h2 className='text-xl text-center font-semibold'>{ props.title }</h2>
        </div>
    );
}
