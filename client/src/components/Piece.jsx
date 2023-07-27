import React from 'react';
import {useChess} from "../hooks/useChess.jsx";

const Piece = ({piece, position}) => {
    const {handleClick} = useChess();
    const color = piece[0] === 'w' ? 'white' : 'black';
    const type = piece[1];

    return (

        <div className="piece" onClick={() => handleClick(position)}>
            {piece && <img className="image" src={piece !== '' && `/${piece}.svg`}/>}
        </div>
    );
};

export default Piece;