import { FunctionComponent } from "react";

interface IconProps {
    iconClassName?: string;
    iconName: string;
}

const Icon: FunctionComponent<IconProps> = (props) => {
    const { iconClassName = "", iconName } = props;

    const getClassName = () => `material-icons ${iconClassName}`;

    return <span className={getClassName()}>
        {iconName}
    </span>
}

export default Icon;