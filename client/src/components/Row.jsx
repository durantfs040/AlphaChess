import Piece from "./Piece.jsx";
import {useChess} from "../hooks/useChess.jsx"

const Row = ({rowPositions, rank}) => {
    const {positionFrom} = useChess()
    return (
        <div className="row">
            {rowPositions.map((piece, file) => <div className="square"
                                                    style={{background: (positionFrom[0] === rank && positionFrom[1] === file)? 'green' : (rank + file) % 2 === 0 ? '#fde6bf' : '#c78443'}}
                                                    key={file}>
                <Piece piece={piece} position={[rank, file]}/>
            </div>)}
        </div>
    );
};

export default Row;