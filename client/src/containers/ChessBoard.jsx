import Row from "./Row.jsx";

const ChessBoard = () => {
    const positions = [['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'], ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'], [], [],
        [], [], ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'], ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']];
    return (
        <div>
            {positions.map((position, index) => {
                return (
                    <Row key={index} positions={position}/>
                );
            })}
        </div>
    );
};

export default ChessBoard