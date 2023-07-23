
const Row = ({rowPositions, file}) => {
    return (
        <div className="row">
            {rowPositions.map((position, index) => <div className="square"
                                                        style={{background: (file + index) % 2 === 0 ? '#fde6bf' : '#c78443'}}
                                                        key={index}><img src={position !== '' && `/${position}.svg`}
                                                                         className="pieceimage" width={100}/></div>)}
        </div>
    );
};

export default Row;