import React, { useState } from 'react';
import * as allThemes from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Field } from '../../functions/types/formTypes';

import Editor from './Editor';
import Highlighter from './SyntaxHighlighter';
import ThemeSelector from './ThemeSelector';


interface CodeEditorProps {
    field: Field,
    changeValueCB: (id: number, value: string) => void,
}

const defaultTheme: keyof typeof allThemes = "atomOneDark" || Object.keys(allThemes).sort()[0];

export default function CodeEditor(props: CodeEditorProps) {
    const {field, changeValueCB} = props;
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<keyof typeof allThemes>(defaultTheme);
    const [code, setCode] = useState(field.value || "");


    return (
        <div className="mb-2 w-full">
            <label className="block text-gray-700 text-lg">
                {field.label}
            </label>
            <button type='button' className="bg-blue-400 rounded-lg px-4 py-2 font-semibold mt-2 text-sm" onClick={_=> setOpen(true)}>
                Open Code Editor
            </button>
            { open && (
                <div className="absolute top-0 left-0 w-screen h-screen p-10 z-101 bg-blue-50">
                    <div className="max-w-[1400px] w-full mx-auto h-full">
                        <div className="flex justify-evenly">
                            <div className="max-w-[260px] w-1/2 py-1 pl-4 bg-white rounded-lg">
                                <p className="text-[16px] font-medium">Language</p>
                                <div className="text-sm">{field.options}</div>
                            </div>
                            <ThemeSelector 
                                defaultTheme={defaultTheme}
                                onChangeCB={theme => setTheme(theme as keyof typeof allThemes)}
                                data={allThemes}
                            />
                        </div>
                        <div className="flex my-8 h-4/5 justify-between">
                            <Editor 
                                placeholder="Type your code here..."
                                value={code ? code : ""}
                                onChangeCB={code => setCode(code)}
                            />
                            <Highlighter language={field.options!} theme={allThemes[theme]}>
                                { code }
                            </Highlighter>
                        </div>
                        <div className="flex gap-8">
                            <button
                                onClick={_ => {changeValueCB(field.id!, code); setOpen(false)}}
                                className="bg-blue-400 rounded-lg px-8 py-4 font-semibold mt-2 text-[16px]"
                            >
                                Save Code
                            </button>
                            <button
                                onClick={_ => setOpen(false)}
                                className="bg-blue-400 rounded-lg px-8 py-4 font-semibold mt-2 text-[16px]"
                            >
                                Close Editor
                            </button>
                        </div>

                        </div>
                </div>
            )}
        </div>
           
    );
}
