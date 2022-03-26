import {useState, useEffect} from 'react';
import './Converter.css';

const Converter = (props) => {

    const getResource = async (url) => {
        let  res =  await fetch(url);
        if (!res.ok) {
            console.log('shit!!!!!!!!!!!!!');
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return res.json(); 
    }


    const getRate = async (currencyTo = 'USD', currencyFrom = 'USD') => {
        const res = await getResource(`https://v6.exchangerate-api.com/v6/b47dbf329f46700f9c6c6fa0/latest/${currencyFrom}`);
        
        setCurrency(currencyTo)
        if (currencyFrom === 'USD') {
            setRate(rate => res.conversion_rates[currencyTo])    
        } else {
            setRateBYN(rateBYN => res.conversion_rates[currencyTo]) 
        }
    }

    const [fromUSD, setFromUSD] = useState(1);
    const [fromBYN, setFromBYN] = useState(1);
    const [rate, setRate] = useState(0)
    const [rateBYN, setRateBYN] = useState(0)
    const [currency, setCurrency] = useState('USD')

    function changeFromUSD(e) {
        setFromUSD(fromUSD => e)
    }
    function changeFromBYN(e) {
        setFromBYN(fromBYN => e)
    }

    function onGetRates(currency) {
        getRate(currency);
        getRate(currency, 'BYN')
    }
    
    useEffect(() => {
        onGetRates('BYN')
    }, []);

    return (
        <div className="app">
            <div className="exch-block">
                <div className="inp-block">
                    <label htmlFor="exch-input">USD</label>
                    <input type="number" onChange={(e) => changeFromUSD(e.target.value)} min='0' placeholder='enter quantity' defaultValue={fromUSD} />    
                </div>
                <span>to {currency}</span>
                <div className="output">
                    <span>{fromUSD * rate}</span>
                </div>
            </div>

            <div className="exch-block">
                <div className="inp-block">
                    <label htmlFor="exch-input">BYN</label>
                    <input type="number" onChange={(e) => changeFromBYN(e.target.value)} min='0' placeholder='enter quantity' defaultValue={fromBYN} />    
                </div>
                <span>to {currency}</span>
                <div className="output">
                    <span>{fromBYN * rateBYN}</span>
                </div>
            </div>

            <div className="controls">
            <button onClick={() => onGetRates('BYN')}>BYN</button>
            <button onClick={() => onGetRates("USD")}>USD</button>
            <button onClick={() => onGetRates("RUB")}>RUB</button>
            <button onClick={() => onGetRates("GBP")}>GBP</button>
            </div>
        </div>
    )
}

export default Converter;
