import Row from "../components/Row.jsx";
import {useChess} from "../hooks/useChess.jsx";


const ChessBoard = () => {
    const {board, player} = useChess();

    return (
        <div>
            {board.map((e, i) => {
                const index = player === 'w' ? i : 7 - i
                return (
                    <Row key={index} rowPositions={board[index]} rank={index}/>
                );
            })}
        </div>
    );
};

export default ChessBoard