import React, { useEffect, useState } from 'react';

interface RadioOption {
    label: string;
    value: string;
}

interface RadioSelectorProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onOptionChange?: (value: string) => void;
}

export const RadioSelector = ({ name, options, value, onOptionChange }: RadioSelectorProps) => {
    const [selectedOption, setSelectedOption] = useState(value ?? '');

    useEffect(() => {
        setSelectedOption(value ?? '');
    }, [value]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        if (onOptionChange) {
            onOptionChange(event.target.value);
        }
    };

    return (
        <div className="flex flex-row space-x-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center cursor-pointer"
                >
                    <input
                        type="radio"
                        id={option.value}
                        name={name}
                        className="form-radio accent-primary cursor-pointer"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={handleOptionChange}
                    />
                    <span className="ml-2 text-white font-bold">{option.label}</span>
                </label>
            ))}
        </div>
    );
};
