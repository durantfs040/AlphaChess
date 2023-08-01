import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {isEqual, toSan} from "../utils.js";
import {Chess} from "chess.js";


const chess = new Chess();
const startingPositions = chess.board()


const ChessContext = createContext({
    board: [],
    positionFrom: [],
    positionTo: [],
    side: '',
});


const ChessProvider = (props) => {
    const [board, setBoard] = useState(startingPositions);
    const [positionFrom, setPositionFrom] = useState([]);
    const [positionTo, setPositionTo] = useState([])
    const [side, setSide] = useState('w');
    const [game, setGame] = useState('');
    const [gameOver, setGameOver] = useState('No');


    const handleDrag = (e, position) => {
        e.dataTransfer.effectAllowed = 'move';
        const piece = board[position[0]][position[1]]
        if (piece?.color === game) setPositionFrom(position)
    }

    const handleDrop = (position) => {
        setPositionTo(position)
    }

    const handleClick = (position) => {
        const piece = board[position[0]][position[1]]

        // can't click on empty square
        if (!positionFrom.length && piece?.color !== game) return;
        if (!positionFrom.length && !piece) return;

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

        // change moving piece
        if (piece?.color === board[positionFrom[0]][positionFrom[1]].color) {
            setPositionFrom(position)
            return;
        }

        // second click
        setPositionTo(position);
    }

    const rematch = () => {
        setGame(game === 'w' ? 'b' : 'w')
        chess.reset()
        setBoard(startingPositions)
        setGameOver('No')
        setSide('w')
        setPositionFrom([]);
        setPositionTo([]);
    }


    useEffect(() => {
        // player move
        if (!positionFrom.length || !positionTo.length) return

        try {
            chess.move(toSan(positionFrom, positionTo));
        } catch (err) {
            setPositionFrom([]);
            setPositionTo([]);
            return;
        }

        setBoard(chess.board());
        setSide(side === 'w' ? 'b' : 'w')
        setPositionFrom([]);
        setPositionTo([]);
    }, [positionFrom, positionTo]);


    useEffect(() => {
        if (chess.isCheckmate()) setGameOver('Checkmate')
        if (chess.isDraw()) setGameOver('Draw')
        if (chess.isStalemate()) setGameOver('Stalemate')
        if (chess.isThreefoldRepetition()) setGameOver('Three-fold Repetition')

        // computer move
        if (side === game || !game) return;
        console.log(`game`, game);
        console.log('side', side);

        axios.post('http://localhost:4000/analyze', {position: chess.fen()}).then(res => {
            const bestMove = res.data.results.split(' ')[1]
            chess.move(bestMove)
            console.log(chess.ascii())
            setBoard(chess.board());
            setSide(side === 'w' ? 'b' : 'w')
        }).catch((err) => {
            console.error(err)
        })
    }, [board, game])


    return (
        <ChessContext.Provider value={{
            board, setBoard, positionFrom, setPositionFrom, positionTo, setPositionTo,
            handleClick, side, setSide, game, setGame, gameOver, rematch, handleDrag, handleDrop
        }}{...props}/>
    )
}


const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};
