import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Pokemon() {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        axios.get("https://api.pokemontcg.io/v1/cards?subtype=Basic")
            .then(rsp => {
                console.log(rsp);
                setCards(rsp.data.cards)
            })
    }, [])
    return (
        <div>
            <h1>Pokemones</h1>
            {
                cards.map(card => {
                    return (
                        <div>{card.name}</div>
                    )
                })
            }
        </div>
    )
}
export default Pokemon;