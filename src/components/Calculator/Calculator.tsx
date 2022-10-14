
import React, { MouseEvent, useMemo, useState } from 'react';
import axios from 'axios';
import Input from '../Input/Input';
import Range from '../Range/Range';
import './styles/calculator.scss';
import Loader from '../Loader/Loader';

const headers = {
    'Content-Type': 'application/json, charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': "Content-Type, origin, authorization, Access-Control-Allow-Origin"
}

const instance = axios.create({
    baseURL: 'https://hookb.in/eK160jgYJ6UlaRPldJ1P/',
    headers: headers
})

const Calculator = () => {

    const [carPriceValue, setCarPriceValue] = useState(3300000)
    const [initialFeeValue, setInitialFeeValue] = useState(10)
    const [leaseTermValue, setLeaseTermValue] = useState(60)
    const [isRequest, setIsRequest] = useState(false)

    const [isPressed, setIsPressefalse] = useState(false)

    //Первоначальный взнос = Первоначальный взнос (в процентах) * Стоимость автомобиля
    const initialRubFee = useMemo(() => (initialFeeValue / 100) * carPriceValue, [initialFeeValue, carPriceValue]);

    //Ежемесячный платеж = (Стоимость автомобиля - Первоначальный взнос) * ((Процентная ставка * (1 + Процентная ставка)^Срок кредита в месяцах) / ((1 + Процентная ставка)^Срок кредита в месяцах - 1)) 
    const monthPay = useMemo(() => (carPriceValue - (initialFeeValue / 100)) * ((0.035 * Math.pow((1 + 0.035), (leaseTermValue))) / (Math.pow((1 + 0.035), (leaseTermValue)) - 1)), [carPriceValue, initialFeeValue, leaseTermValue]);

    //Сумма договора лизинга = Первоначальный взнос + Срок кредита в месяцах * Ежемесячный платеж
    const agreementSum = useMemo(() => initialRubFee + leaseTermValue * monthPay, [initialRubFee, leaseTermValue, monthPay]);

    const submitFormHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsRequest(true)
        try {
            const result: any = await instance.post('eK160jgYJ6UlaRPldJ1P', { carPriceValue, initialFeeValue, leaseTermValue, initialRubFee, monthPay, agreementSum }, { headers: headers })
            console.log('result', result)
        } catch (error) {
            console.log('error', error)
        }
        setIsRequest(false)
        setIsPressefalse(true)
    }

    console.log('prices', carPriceValue, initialFeeValue, leaseTermValue)

    return <div className='calculatorPage'>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        <form>
            <div className='inputs'>
                <div className={`${isRequest ? 'disableInput' : ''} ${'inputsWrapper'}`}>
                    <Input minCostBorder isRequest={isRequest} label='Стоимость автомобиля' htmlFor='carPrice' id='carPrice' name='carPrice' value={Math.round(carPriceValue)} unit='₽' onInputChange={setCarPriceValue} />
                    <Range minCostBorder isRequest={isRequest} value={Math.round(carPriceValue)} onRangeChange={setCarPriceValue} max={6000000} />
                </div>
                <div className={`${isRequest ? 'disableInput' : ''} ${'inputsWrapper'}`}>
                    <Input minFeeBorder isRequest={isRequest} label='Первоначальный взнос' htmlFor='initialFee' id='initialFee' initialRubFee={initialRubFee} styles='percentInput' name='initialFee' percent value={initialFeeValue} onInputChange={setInitialFeeValue} />
                    <Range minFeeBorder isRequest={isRequest} value={initialFeeValue} onRangeChange={setInitialFeeValue} max={60} />
                </div>
                <div className={`${isRequest ? 'disableInput' : ''} ${'inputsWrapper'}`}>
                    <Input minMonthBorder isRequest={isRequest} label='Срок лизинга' htmlFor='leaseTerm' id='leaseTerm' name='leaseTerm' value={leaseTermValue} unit='мес.' onInputChange={setLeaseTermValue} />
                    <Range isRequest={isRequest} value={leaseTermValue} onRangeChange={setLeaseTermValue} min={1} max={60} />
                </div>
            </div>
            <div className='results'>
                <div className='amountWrapper'>
                    <div className='amount'>
                        <div className='name'>Сумма договора лизинга</div>

                        <div className='sum'>{isNaN(Number(Math.round(agreementSum))) ? "" : Math.round(agreementSum)} ₽</div>
                    </div>
                    <div className='amount'>
                        <div className='name'>Ежемесячный платеж от</div>

                        <div className='sum'>{(Number(Math.round(monthPay)) === Infinity) || isNaN(Number(Math.round(monthPay))) ? "" : Math.round(monthPay)} ₽</div>
                    </div>
                </div>
                <button disabled={isRequest} type='button' className={`${isPressed ? 'pressed' : ''} ${'submitButton'}`} onClick={submitFormHandler}>{isRequest ? <Loader /> : " Оставить заявку"}
                </button>
            </div>
        </form>


    </div>;
}

export default Calculator;