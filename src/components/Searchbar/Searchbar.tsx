import { ReactComponent as SearchIcon } from 'assets/search-icon.svg';
import { SearchBarProps } from './SearchBar.types';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import './SearchBar.css';

export const SearchBar = ({ placeholder, className, style }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleClick = () => {
        inputRef.current?.focus();
    };

    const handleSubmit = () => {
        navigate(`/accounts/${inputRef.current?.value}/transactions`, { replace: true });
    };

    return (
        <form
            onClick={handleClick}
            className={`searchbar ${className}`}
            style={style}
            onSubmit={handleSubmit}
        >
            <input ref={inputRef} placeholder={placeholder} className="searchbar-input text-xs" />
            <SearchIcon />
        </form>
    );
};
