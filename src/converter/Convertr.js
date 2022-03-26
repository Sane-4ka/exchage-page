import {useState, useEffect} from 'react';
import './Converter.css';

const Converter = (props) => {

    const getResource = async (url) => {
        console.log(url);
        let  res =  await fetch(url);

        if (!res.ok) {
            console.log('shit');
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        } else {
            console.log('good');
        }
        console.log(res);
        // return res.json(); 
    }

    const getRate = async (town = 'Брест') => {
        console.log('1')
        // const res = await getResource(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=300&apikey=0caca179e55b92eb71501e00207d7c5e`);
        // const res = await getResource(`https://belarusbank.by/api/kursExchange?city=${town}`);
        const res = await getResource(`https://belarusbank.by/api/kursExchange`);
        console.log(res)
    }

    // const getRes = () => {
    //     getResource()
    // }

    return (
        <div class="app">
        <div class="counter">Покупка банком по {'ssff'}</div>
        <div class="counter">Продажа банком за {'ssff'}</div>
        <div class="controls">
          <button onClick={() => getRate()}>INC</button>
          {/* <button onClick={onDecr}>DEC</button> */}
          {/* <button onClick={onRandom}>RND</button> */}
          {/* <button onClick={onReset}>RESET</button> */}
        </div>
      </div>
    )
}

export default Converter;
