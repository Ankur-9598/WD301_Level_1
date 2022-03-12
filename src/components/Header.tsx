import { ActiveLink } from 'raviger';
import React from 'react';
import logo from '../logo.svg';

export default function Header() {
    return (
        <div className="flex gap-2 items-center">
            <img 
                src={logo}
                className="w-16 h-16 animate-spin" 
                style={{ animation: "spin 2s linear infinite" }} 
                alt="logo" 
            />
            <div className="flex gap-2 items-center">
                {[
                    { page: "Home", url: "/"},
                    { page: "About", url: "/about"}
                ].map(link => (
                    <ActiveLink
                        key={link.url}
                        href={link.url}
                        className="text-gray-700 p-2 m-2 uppercase font-semibold"
                        exactActiveClass="text-blue-700 border-b-2 border-blue-700"
                    >
                        {link.page}
                    </ActiveLink>
                ))}
            </div>
        </div>
    );
}
