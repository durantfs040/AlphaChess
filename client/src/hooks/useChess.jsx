import {createContext, useContext, useEffect, useState} from "react";
import {startingPositions} from "../constants";
import rules from "../rules";

const ChessContext = createContext({
    positions: [],
    positionFrom: [],
    positionTo: [],
});

const ChessProvider = (props) => {
    const [positions, setPositions] = useState(startingPositions);
    const [positionFrom, setPositionFrom] = useState([]);
    const [positionTo, setPositionTo] = useState([])
    const [side, setSide] = useState('white');

    const handleClick = (position) => {
        if (!positionFrom.length && !positions[position[0]][position[1]]) return;
        if (!positionFrom.length) {
            setPositionFrom(position);
            return;
        }
        if (positionFrom[0] === position[0] && positionFrom[1] === position[1]) {
            setPositionFrom([]);
            return;
        }
        setPositionTo(position);
    }

    const movePiece = (from, to) => {
        const newPositions = [...positions];
        newPositions[to[0]][to[1]] = positions[from[0]][from[1]];
        newPositions[from[0]][from[1]] = '';
        setPositions(newPositions);
    };


    useEffect(() => {
        console.log(`from`, positionFrom, 'to', positionTo);
        if (!positionFrom.length || !positionTo.length) return
        const piece = positions[positionFrom[0]][positionFrom[1]];
        if (rules(positionFrom, positionTo, piece)) movePiece(positionFrom, positionTo);
        setPositionFrom([]);
        setPositionTo([]);
    }, [positionFrom, positionTo]);

    return (
        <ChessContext.Provider value={{
            positions, setPositions, positionFrom, setPositionFrom, positionTo, setPositionTo,
            handleClick, side, setSide
        }}{...props}/>
    )
}

const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};