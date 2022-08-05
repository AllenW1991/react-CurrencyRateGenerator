import { useEffect, useState } from 'react'
import './styles/style.css'

function Generator() {
    const [money, setMoney] = useState(5000)
    const [exangeMoney, setExangeMoney] = useState('')
    const [currency, setCurrency] = useState([
        { currency: 'USD', rate: 0.033 },
        { currency: 'HKD', rate: 0.26 },
        { currency: 'JPY', rate: 43.63 },
        { currency: 'GBP', rate: 0.027 },
    ])
    const [newCurrency, setNewCurrency] = useState({ currency: '', rate: '' })
    const [exchangeHistory, setExchangeHistory] = useState([{ currency: null, total: null }])

    function getExchangeMoney(e) {
        const { value } = e.target
        setExangeMoney(value)
    }

    function exchangeHandler(e) {
        const { id } = e.target

        let activedCurrency = currency.filter((item) => {
            return item.currency === id
        })
        setExchangeHistory([...exchangeHistory, { currency: id, total: exangeMoney * activedCurrency[0].rate }])

        setMoney(money - exangeMoney)
        setExangeMoney('')
    }

    function getNewCurrency(e) {
        const { value, name } = e.target
        setNewCurrency(() => {
            return { ...newCurrency, [name]: value }
        })
    }

    function addCurrency() {
        if (!newCurrency.currency || !newCurrency.rate) {
            alert('please enter currency and rate.')
            setNewCurrency({ currency: '', rate: '' })
            return
        }
        setCurrency([...currency, newCurrency])
        setNewCurrency({ currency: '', rate: '' })
    }

    function ExchangeHistory() {
        let timeStamp = new Date().toUTCString().slice(0, -3)

        return exchangeHistory.map((item, index) => (
            <li key={index}>
                {item.currency} {item.total} {timeStamp}
            </li>
        ))
    }

    return (
        <div className="generator">
            <section className="wallet">
                <h2>WALLET</h2>
                <span> Your money : {money}</span>
            </section>
            <section className="currency-list">
                <h2>ADD CURRENCY</h2>
                <div className="title">
                    CURRENCY NAME :
                    <input type="text" value={newCurrency.currency} name="currency" onChange={getNewCurrency} />
                </div>
                <div className="title">
                    RATE : <input type="number" value={newCurrency.rate} name="rate" onChange={getNewCurrency} />
                </div>
                <button type="button" onClick={addCurrency}>
                    ADD
                </button>

                <ul>
                    CURRENCY LIST
                    <input
                        type="number"
                        value={exangeMoney}
                        onChange={getExchangeMoney}
                        required
                        placeholder="enter exchange number"
                    />
                    {currency.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.currency} RATE : {item.rate}
                                <button type="button" onClick={exchangeHandler} id={item.currency}>
                                    EXANGE
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="exchange-history">
                <h2>EXANGE HISTORY</h2>
                <ul>
                    <ExchangeHistory />
                </ul>
            </section>
        </div>
    )
}

export default Generator
