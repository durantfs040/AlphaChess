import Piece from "./Piece.jsx";

const Row = ({rowPositions, rank}) => {

    return (
        <div className="row">
            {rowPositions.map((piece, file) => <div className="square" key={file}>
                <Piece piece={piece} position={[rank, file]}/>
            </div>)}
        </div>
    );
};

export default Row;