import Piece from "./Piece.jsx";

const Row = ({rowPositions, rank}) => {

    return (
        <div className="row">
            {rowPositions.map((piece, file) => <div className="square"
                                                    style={{background: (rank + file) % 2 === 0 ? '#fde6bf' : '#c78443'}}
                                                    key={file}>
                <Piece piece={piece} position={[rank, file]}/>
            </div>)}
        </div>
    );
};

export default Row;