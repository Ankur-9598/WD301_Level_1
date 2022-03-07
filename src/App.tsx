import React from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import logo from './logo.svg';

const formFields = [
    { id: 1, label: "First Name", type: "text"},
    { id: 2, label: "Last Name", type: "text"},
    { id: 3, label: "Email", type: "email"},
    { id: 4, label: "Phone Number", type: "tel"},
    { id: 5, label: "Date of Birth", type: "date"}
]

function App() {
    return (
        <AppContainer>
            <div className="mx-auto p-5 bg-white rounded-xl shadow-lg">
                <Header
                    title={"Welcome to react-typescript with tailwindcss course"}
                />
                {formFields.map(field => (
                    <React.Fragment key={field.id}>
                        <label className="block text-gray-600 text-lg">
                            {field.label}
                        </label>
                        <input 
                            type={field.type} 
                            className="w-full p-2 border-2 border-gray-200 rounded-lg mb-2"
                        />
                    </React.Fragment>
                ))}
                <button 
                    className="w-3/12 px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3"
                >
                    Submit
                </button>
            </div>
        </AppContainer>
    );
}

export default App;
