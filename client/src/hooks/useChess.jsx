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
    const [player, setPlayer] = useState('');


    const handleClick = (position) => {
        const piece = board[position[0]][position[1]]

        // can't click on empty square
        if (!positionFrom.length && piece?.color !== side) return;
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


    useEffect(() => {
        // player move
        if (!positionFrom.length || !positionTo.length) return

        try {
            chess.move(toSan(positionFrom, positionTo))
        } catch (err) {
            setPositionTo([])
            return;
        }

        setBoard(chess.board());
        setSide(side === 'w' ? 'b' : 'w')
        setPositionFrom([]);
        setPositionTo([]);
    }, [positionFrom, positionTo]);


    useEffect(() => {
        if (chess.isCheckmate()) alert('you fucking suck')
        if (chess.isDraw()) alert('Draw')
        if (chess.isStalemate()) alert('Stalemate')
        if (chess.isThreefoldRepetition()) alert('Three-fold Repetition')

        // computer move
        if (side === player || !player) return;

        axios.post('http://localhost:4000/analyze', {position: chess.fen()}).then(res => {
            const bestMove = res.data.results.split(' ')[1]
            chess.move(bestMove)
            console.log(chess.ascii())
            setBoard(chess.board());
            setSide(side === 'w' ? 'b' : 'w')
        }).catch((err) => {
            console.error(err)
        })
    }, [board, player])


    return (
        <ChessContext.Provider value={{
            board, setBoard, positionFrom, setPositionFrom, positionTo, setPositionTo,
            handleClick, side, setSide, player, setPlayer
        }}{...props}/>
    )
}


const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};
