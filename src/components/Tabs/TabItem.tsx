import React from 'react';

type TabItemProps = {
    id: number;
    label: string;
    isSelected: boolean;
    onChange: (index: number) => void;
};

export const TabItem = ({ id, label, isSelected, onChange }: TabItemProps) => {
    const handleTabChange = () => {
        onChange(id);
    };

    return (
        <div
            onClick={handleTabChange}
            className={'inline-block p-6 border-t-2 border-solid border-transparent cursor-pointer text-center hover:text-white text-lgray'.concat(
                isSelected ? 'text-white border-t-white font-bold' : '',
            )}
        >
            {label}
        </div>
    );
};
