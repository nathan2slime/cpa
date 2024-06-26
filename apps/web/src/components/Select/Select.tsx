import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CardDescription} from "@/components/ui/card";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";
import PropTypes from "prop-types";


// @ts-ignore
const SelectTipo = ({className, initialValue = 'coluna', onValueChange,value}) => {

    const [selectedValue, setSelectedValue] = useState(initialValue);
    // console.log(selectedValue)

    return (
        <div className={className} >
            <Select value={value} onValueChange={onValueChange}  >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />

                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="coluna">Gráficos de coluna.</SelectItem>
                    <SelectItem value="pizza">Gráficos em pizza.</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectTipo;



 SelectTipo.propTypes = {
    initialValue: PropTypes.string,
    className: PropTypes.string
}