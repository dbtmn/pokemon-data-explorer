import React from "react";
import Icon from "../../components/Icon";

import "./index.scss";

export enum ErrorSize {
    sm = "small",
    md = "medium",
    lg = "large"
}

interface ErrorProps {
    message: string;
    size?: ErrorSize;
}

const Error: React.FunctionComponent<ErrorProps> = (props) => {
    const { message, size = ErrorSize.sm } = props;

    const getClassName = () => `error__icon error-icon--${size}`;

    return <div className="error__wrapper">
        <Icon iconClassName={getClassName()} iconName="error" />
        <div className="error__message">
            {message}
        </div>
    </div>;
};

export default Error;