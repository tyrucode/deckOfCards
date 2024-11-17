const CardDisplay = ({ individualCard }) => {
    return (
        <div className="card-container">
            {individualCard && <img src={individualCard.image} alt={individualCard.code} className="card-image" />}
        </div>
    );
};
export default CardDisplay;
