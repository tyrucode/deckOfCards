const DeckButtons = ({ onDrawCard, onShuffleDeck, remaining }) => {
    return (
        <div className="button-container">
            <button className="myBtn" onClick={onDrawCard}>
                Cards remaining - {remaining}
            </button>
            <button className="myBtn" onClick={onShuffleDeck}>
                Shuffle a New Deck
            </button>
        </div>
    );
};
export default DeckButtons;
