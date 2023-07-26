import {createContext, useContext, useEffect, useState} from "react";
import {startingPositions} from "../constants/index.js";

const ChessContext = createContext({
    positions: [],
    positionFrom: [],
    positionTo: [],
});

const ChessProvider = (props) => {
    const [positions, setPositions] = useState(startingPositions);
    const [positionFrom, setPositionFrom] = useState([]);
    const [positionTo, setPositionTo] = useState([]);
    const [isMoving, setIsMoving] = useState(false);
    const [side, setSide] = useState('white');

    const handleClick = (position) => {
        if (!isMoving && !positions[position[0]][position[1]]) return;
        if (!isMoving) {
            setPositionTo([]);
            setPositionFrom(position);
            setIsMoving(true);
            return;
        }
        if (positionFrom[0] === position[0] && positionFrom[1] === position[1]) {
            setPositionFrom([]);
            setIsMoving(!isMoving);
            return;
        }
        setPositionTo(position);
        setIsMoving(false);
    }

    const movePiece = (from, to) => {
        if (!to.length) return;
        const newPositions = [...positions];
        newPositions[to[0]][to[1]] = positions[from[0]][from[1]];
        newPositions[from[0]][from[1]] = '';
        setPositions(newPositions);
    };


    useEffect(() => {
        console.log(`from`, positionFrom, 'to', positionTo);
        movePiece(positionFrom, positionTo);
    }, [positionFrom, positionTo]);

    return (
        <ChessContext.Provider value={{
            positions, setPositions, positionFrom, setPositionFrom, positionTo, setPositionTo, isMoving, setIsMoving,
            handleClick, side, setSide
        }}{...props}/>
    )
}

const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};