import {useChess} from "../hooks/useChess.jsx";

const Row = ({rowPositions, rank}) => {
    const {handleClick} = useChess()

    return (
        <div className="row">
            {rowPositions.map((position, file) => <div className="square"
                                                        style={{background: (rank + file) % 2 === 0 ? '#fde6bf' : '#c78443'}}
                                                        key={file} onClick={() => handleClick([file + 1, 8 - rank])}><img src={position !== '' && `/${position}.svg`}
                                                                                                                            className="pieceimage" width={100}/></div>)}
        </div>
    );
};

export default Row;