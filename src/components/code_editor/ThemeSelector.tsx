import React from 'react';

interface ThemeSelectorProps {
    defaultTheme: string;
    onChangeCB: (theme: string) => void;
    data: any;
}

export default function ThemeSelector(props: ThemeSelectorProps) {
    const { defaultTheme, onChangeCB, data } = props;

    return (
        <select 
            title='Select theme'
            placeholder='Select theme' 
            className="max-w-[260px] w-1/2 bg-white rounded-lg pl-4 text-[16px] font-medium" 
            defaultValue={defaultTheme} 
            onChange={e => onChangeCB(e.target.value)}
        >
            {Object.keys(data)
            .sort()
            .map((theme, index) => (
                <option key={index} value={theme}>
                    {theme}
                </option>
            ))}
        </select>
    );
}
