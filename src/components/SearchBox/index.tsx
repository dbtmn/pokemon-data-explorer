import { FunctionComponent, useState } from "react";

import "./index.scss";

interface SearchBoxProps {
    className?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
    const { className = "", placeholder = "", onChange } = props;

    const [inputValue, setInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setInput(value);
        onChange(value);
    }

    return <div className={`${className} search-box__wrapper`}>
        <div className="search-box__input-wrapper">
            <input
                id="search-bar"
                placeholder={placeholder}
                type="text"
                className="search-box__input"
                value={inputValue}
                onChange={handleChange} />
            <input
                type="text"
                readOnly
                className="search-box__input"
            />
            <span className="material-icons search-box__search-icon">
                search
            </span>
        </div>
    </div>
};

export default SearchBox;