import { useEffect, useRef, useState } from "react";
import CardDisplay from "./CardDisplay";
import DeckButtons from "./DeckButtons";

const DeckClicker = () => {
    //set api to variable
    const deckOfCardsApi = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    //set everythings state to null
    const [deckId, setDeckId] = useState(null);
    const [individualCard, setIndividualCard] = useState(null);
    const [remaining, setRemaining] = useState(null);
    //reference new deck so it can be used across states/scopes
    const newDeck = useRef();
    //function to create new decks
    const createDeck = async () => {
        try {
            //set useRef to our new deck
            newDeck.current = await axios.get(deckOfCardsApi);
            //set newdecks id to our refs state
            setDeckId(newDeck.current.data.deck_id);
            //do it again but for remaining carcs
            setRemaining(newDeck.current.data.remaining);
            //set cards to null 
            setIndividualCard(null);
        } catch (e) {
            console.error(e);
        }
    };
    //on first render call create new deck function
    useEffect(() => {
        createDeck();
    }, []);

    const CardPicker = async () => {
        //if no deckId give up
        if (!deckId) return;
        try {
            //set variable for the deck id
            const drawResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            //set the card to whatever card comes next in the deck
            setIndividualCard(drawResponse.data.cards[0]);
            //remaining cards is the amount of cards remaning -_-
            setRemaining(drawResponse.data.remaining);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1>Click for a card from the deck.</h1>
            <CardDisplay individualCard={individualCard} />
            <DeckButtons onDrawCard={CardPicker} onShuffleDeck={createDeck} remaining={remaining} />
        </>
    );
};

export default DeckClicker;
