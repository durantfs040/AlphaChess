import Piece from "./Piece.jsx";
import {useChess} from "../hooks/useChess.jsx";

const Row = ({rowPositions, rank}) => {
    const {game} = useChess();
    return (
        <div className="row">
            {rowPositions.map((piece, index) => {
                    const file = game === 'w' ? index : 7 - index
                    return (<div className="square" key={file}>
                        <Piece piece={rowPositions[file]} position={[rank, file]}/>
                    </div>)
                }
            )
            }
        </div>
    );
};

export default Row;