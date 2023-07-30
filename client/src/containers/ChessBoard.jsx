import Row from "../components/Row.jsx";
import {useChess} from "../hooks/useChess.jsx";


const ChessBoard = () => {
    const {board} = useChess();

    return (
        <div>
            {board.map((position, index) => {
                return (
                    <Row key={index} rowPositions={position} rank={index}/>
                );
            })}
        </div>
    );
};

export default ChessBoard