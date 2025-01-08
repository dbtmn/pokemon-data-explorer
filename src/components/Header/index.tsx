import { FunctionComponent } from "react";

import "./index.scss";

interface HeaderProps {
    title: string;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    const { title } = props;

    return <div className="header__wrapper">
        <h2>{title}</h2>
    </div>
};

export default Header;