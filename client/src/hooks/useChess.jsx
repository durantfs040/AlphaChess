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

    const handleClick = (position) => {
        if(!isMoving) {
            setPositionTo([]);
            setPositionFrom(position);
        } else {
            setPositionTo(position);
        }
        setIsMoving(!isMoving);
    }


    useEffect(() => {
        console.log(`from`, positionFrom, 'to', positionTo);
    }, [positionFrom, positionTo]);

    return (
        <ChessContext.Provider value={{positions, setPositions, positionFrom, setPositionFrom, positionTo, setPositionTo, isMoving, setIsMoving,
        handleClick}}{...props}/>
    )
}

const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};