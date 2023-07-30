import React from 'react';
import {useChess} from "../hooks/useChess.jsx";
import {isEqual} from "../utils.js";

const Piece = ({piece, position}) => {
    const {handleClick, positionFrom} = useChess();
    const isClicked = isEqual(position, positionFrom)

    return (

        <div className="piece"
             style={{background: isClicked ? '#689b5f' : (position[0] + position[1]) % 2 ? '#c78443' : '#fde6bf'}}
             onClick={() => handleClick(position)}>
            {piece && <img className="image" src={piece !== '' && `/${piece}.svg`}/>}
        </div>
    );
};

export default Piece;