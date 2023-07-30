import {createContext, useContext, useEffect, useState} from "react";
import {startingPositions} from "../constants";
import {castle} from "../rules";
import axios from "axios";
import {boardToFen, isEqual, toNumber, toSan} from "../utils.js";
import {Chess} from "chess.js";

const chess = new Chess();

const ChessContext = createContext({
    board: [],
    positionFrom: [],
    positionTo: [],
    side: '',
});

const ChessProvider = (props) => {
    // todo: rewrite project structure using chess.js
    const [board, setBoard] = useState(startingPositions);
    const [positionFrom, setPositionFrom] = useState([]);
    const [positionTo, setPositionTo] = useState([])

    const [side, setSide] = useState('w');

    useEffect(() => {
        console.log(chess.ascii())
    }, [board])
    if (chess.isCheckmate()) alert('Checkmate you idiot')


    const handleClick = (position) => {
        // can't click on empty square
        if (!positionFrom.length && board[position[0]][position[1]][0] !== side) return;
        if (!positionFrom.length && !board[position[0]][position[1]]) return;
        // first click
        if (!positionFrom.length) {
            setPositionFrom(position);
            return;
        }
        // cancel if click on same square
        if (isEqual(positionFrom, position)) {
            setPositionFrom([]);
            return;
        }
        if (board[position[0]][position[1]][0] === board[positionFrom[0]][positionFrom[1]][0]) {
            setPositionFrom(position)
            return;
        }
        // second click
        setPositionTo(position);
    }

    const movePiece = (from, to) => {
        const newBoard = [...board];
        newBoard[to[0]][to[1]] = board[from[0]][from[1]];
        newBoard[from[0]][from[1]] = '';
        setBoard(newBoard);
        setSide(side === 'w' ? 'b' : 'w');
    };


    useEffect(() => {
        // from and to positions can't be empty
        if (!positionFrom.length || !positionTo.length) return

        const piece = board[positionFrom[0]][positionFrom[1]];
        const capturedPiece = board[positionTo[0]][positionTo[1]];

        try {
            chess.move(toSan(positionFrom, positionTo))
        } catch (err) {
            setPositionTo([])
            return;
        }
        movePiece(positionFrom, positionTo);
        // if (rules(positionFrom, positionTo, piece, capturedPiece, side)) {
        //     movePiece(positionFrom, positionTo);
        // } else {
        //     setPositionTo([])
        // }
        if (piece[1] === 'k' && Math.abs(positionFrom[1] - positionTo[1]) === 2) movePiece(...castle(positionFrom, positionTo))

        setPositionFrom([]);
        setPositionTo([]);
    }, [positionFrom, positionTo]);

    useEffect(() => {
        if (side === 'w') return
        const position = boardToFen(board, side)

        axios.post('http://localhost:4000/analyze', {position}).then(res => {
            const bestMove = res.data.results.split(' ')[1]

            const {from, to} = toNumber(bestMove)
            movePiece(from, to)

            chess.move(bestMove)
            if (board[to[0]][to[1]][1] === 'k' && Math.abs(from[1] - to[1]) === 2) movePiece(...castle(from, to))
            setSide(side === 'w' ? 'b' : 'w')
        }).catch((err) => {
            console.error(err)
        })

    }, [board])

    return (
        <ChessContext.Provider value={{
            board, setBoard, positionFrom, setPositionFrom, positionTo, setPositionTo,
            handleClick, side, setSide
        }}{...props}/>
    )
}

const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};
