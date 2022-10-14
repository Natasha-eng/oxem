import React, { ChangeEvent, useState } from 'react';
import './styles/range.scss';

interface RangeProps {
    onRangeChange: (value: number) => void;
    value: number;
    min?: number;
    max: number;
    minCostBorder?: boolean;
    minFeeBorder?: boolean;
    isRequest: boolean;
}

const Range: React.FC<RangeProps> = ({ onRangeChange, value, min, max, minCostBorder, minFeeBorder, isRequest }) => {

    const onChangeRangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (minCostBorder && e.target.valueAsNumber < 999999) {
            console.log('vlue', e.target.valueAsNumber)
            onRangeChange(1000000)
            return
        }

        if (minFeeBorder && e.target.valueAsNumber < 10) {
            return
        }
        onRangeChange(e.target.valueAsNumber)
    }

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(value * 100 / max)}% 100%`
        }
    }
    console.log('getBackgroundSize', getBackgroundSize())
    console.log('value', value)

    return <>
        <input
            type={"range"}
            onChange={onChangeRangeHandler}
            max={max}
            value={value}
            disabled={isRequest}
            style={getBackgroundSize()}
            min={1}
        />
    </>;
}

export default Range;