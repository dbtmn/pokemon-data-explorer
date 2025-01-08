import { ChangeEvent, FunctionComponent, useState } from "react";
import CheckBox from "../Checkbox";
import { Filter } from "../../store/filters/types";

import "./index.scss"


interface FiltersProps {
    filters: Filter[]
    onFilterChange: (activeFilter: string) => void
}

const Filters: FunctionComponent<FiltersProps> = ({ filters, onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>, filterName: string) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedFilter(filterName);
            onFilterChange(filterName)
        } else {
            setSelectedFilter('');
            onFilterChange('')
        }
    };

    return <div className="filters">
        <div className="filters__title">Filter By Type</div>
        <div className="filters__table_outer base-shadow">
            <div className="filters__table">
                {filters.map((filter, index) =>
                    <CheckBox key={index} value={selectedFilter.includes(filter.name)} label={filter.name} onChange={(e) => { handleChange(e, filter.name) }} />
                )
                }
            </div>
        </div>
    </div>
}
export default Filters