import Row from "../components/Row.jsx";
import {startingPositions} from "../constants/index.js";
import {useState} from "react";
import {useChess} from "../hooks/useChess.jsx";


const ChessBoard = () => {
    const {positions} = useChess();

    return (
        <div>
            {positions.map((position, index) => {
                return (
                    <Row key={index} rowPositions={position} rank={index}/>
                );
            })}
        </div>
    );
};

export default ChessBoard