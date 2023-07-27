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
        // can't click on empty square
        if (!positionFrom.length && !positions[position[0]][position[1]]) return;
        // first click
        if (!positionFrom.length) {
            setPositionFrom(position);
            return;
        }
        // cancel if click on same square
        if (positionFrom[0] === position[0] && positionFrom[1] === position[1]) {
            setPositionFrom([]);
            return;
        }
        // second click
        setPositionTo(position);
    }

    const movePiece = (from, to) => {
        const newPositions = [...positions];
        newPositions[to[0]][to[1]] = positions[from[0]][from[1]];
        newPositions[from[0]][from[1]] = '';
        setPositions(newPositions);
    };


    useEffect(() => {
        // from and to positions can't be empty
        if (!positionFrom.length || !positionTo.length) return

        const piece = positions[positionFrom[0]][positionFrom[1]];
        const capturedPiece = positions[positionTo[0]][positionTo[1]];

        // move piece if obey rules
        if (rules(positionFrom, positionTo, piece, capturedPiece)) movePiece(positionFrom, positionTo);

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