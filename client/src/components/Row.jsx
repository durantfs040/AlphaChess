import Piece from "./Piece.jsx";
import {useChess} from "../hooks/useChess.jsx"

const Row = ({rowPositions, rank}) => {
    const {positionFrom} = useChess()

    return (
        <div className="row">
            {rowPositions.map((piece, file) => <div className="square" key={file}>
                <Piece piece={piece} position={[rank, file]}/>
            </div>)}
        </div>
    );
};

export default Row;