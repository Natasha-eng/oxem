import React, { ChangeEvent, useState } from 'react';

import './styles/input.scss';

interface InputTProp {
    label: string;
    htmlFor: string;
    id: string;
    name: string;
    value: number;
    unit?: string;
    percent?: boolean;
    styles?: string;
    initialRubFee?: number;
    isRequest: boolean;
    minCostBorder?: boolean;
    minFeeBorder?: boolean;
    minMonthBorder?: boolean;
    onInputChange: (value: number) => void;
}

const Input = ({ label, htmlFor, id, name, value, unit, percent, styles, initialRubFee, minCostBorder, minFeeBorder, minMonthBorder, isRequest, onInputChange }: InputTProp): JSX.Element => {
    const [isActive, setIsActive] = useState(false)

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return
        }
        setIsActive(true)
        onInputChange(Number(e.target.value))

    }

    const onBlurChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsActive(false)
        if (minCostBorder && (Number(e.target.value) < 1000000 || isNaN(Number(e.target.value)))) {
            onInputChange(1000000)
            return
        } else if (minCostBorder && (Number(e.target.value) > 6000000 || isNaN(Number(e.target.value)))) {
            onInputChange(6000000)
            return
        } else if (minFeeBorder && (Number(e.target.value) < 10 || isNaN(Number(e.target.value)))) {
            onInputChange(10)
            return
        } else if (minFeeBorder && (Number(e.target.value) || isNaN(Number(e.target.value))) > 60) {
            onInputChange(60)
            return
        } else if (minMonthBorder && (Number(e.target.value) < 1 || isNaN(Number(e.target.value)))) {
            onInputChange(1)
            return
        } else if (minMonthBorder && (Number(e.target.value) > 60 || isNaN(Number(e.target.value)))) {
            onInputChange(60)
            return
        }
    }

    return <div className='inputContainer'>
        <label className='inputHeader' htmlFor={htmlFor}>{label}</label>
        <div className={percent ? 'percentField' : ''}>
            {percent ? <>{initialRubFee && Math.round(initialRubFee)} ₽</> : <></>}
            <input
                type="text"
                id={id}
                name={name}
                value={value.toString()}
                onChange={onInputChangeHandler}
                onBlur={onBlurChangeHandler}
                disabled={isRequest}
                className={`${isActive ? 'activeField' : ''} ${styles}`}
            />
        </div>
        <span className='unit'>{unit}</span>
    </div>;
}

export default Input;