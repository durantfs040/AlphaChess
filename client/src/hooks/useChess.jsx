import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {isEqual, toSan} from "../utils.js";
import {Chess} from "chess.js";


const chess = new Chess();
const startingPositions = chess.board()
const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const serverUrl = 'http://localhost:4000';

const ChessContext = createContext({
    board: [],
    positionFrom: [],
    positionTo: [],
    history: [],
    side: '',
});


const ChessProvider = (props) => {
    const [board, setBoard] = useState(startingPositions);
    const [positionFrom, setPositionFrom] = useState([]);
    const [positionTo, setPositionTo] = useState([])
    const [history, setHistory] = useState([{board: startingPositions, fen: startingFen}]);
    const [side, setSide] = useState('w');
    const [game, setGame] = useState('');
    const [gameOver, setGameOver] = useState('No');
    const [moves, setMoves] = useState([]);


    const playSound = (name) => {
        const audio = new Audio(`${name}.mp3`);
        audio.play();
    };


    const handleDrag = (e, position) => {
        e.dataTransfer.effectAllowed = 'move';
        const piece = board[position[0]][position[1]];
        (piece?.color === side) && setPositionFrom(position);
    }

    const handleDrop = (position) => {
        positionFrom.length && setPositionTo(position)
    }


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
            setMoves([]);
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
        chess.reset()
        setGame(game === 'w' ? 'b' : 'w')
        setBoard(startingPositions)
        setGameOver('No')
        setSide('w')
        setPositionFrom([]);
        setPositionTo([]);
        setHistory([{board: startingPositions, fen: startingFen}])
    }


    const handleRevert = () => {
        if (history.length === (1 + (game === 'b'))) return;

        playSound('move')

        setBoard(history[history.length - history.length % 2 - 2 - (game === 'b')].board)
        chess.load(history[history.length - history.length % 2 - 2 - (game === 'b')].fen)

        let newHistory = history
        newHistory = newHistory.slice(0, history.length - history.length % 2 - 1 - (game === 'b'))

        setHistory(newHistory)
        setGameOver('No')
        setSide(game)
    }


    useEffect(() => {
        axios.get(`${serverUrl}/reset`)
        game !== '' && playSound('start')
    }, [game])


    useEffect(() => {
        // player move
        if (!positionFrom.length || !positionTo.length) return
        setMoves([])
        try {
            if (moves.includes(8 * (7 - positionTo[0]) + positionTo[1])) {
                console.log('legal move');
                axios.post(`${serverUrl}/move`, {
                    from: 8 * (7 - positionFrom[0]) + positionFrom[1],
                    to: 8 * (7 - positionTo[0]) + positionTo[1],
                })
            } else {
                console.log('illegal move')
            }
            const move = chess.move(toSan(positionFrom, positionTo));
            chess.isCheck() ? playSound('check') : move.captured ? playSound('capture') : playSound('move')
        } catch (err) {
            setPositionFrom([]);
            setPositionTo([]);
            return;
        }

        setBoard(chess.board());
        setHistory((prev) => [...prev, {board: chess.board(), fen: chess.fen()}])
        setSide(side === 'w' ? 'b' : 'w')
        setPositionFrom([]);
        setPositionTo([]);
    }, [positionTo]);

    useEffect(() => {
        if (!positionFrom.length) return;

        try {
            axios.get(`${serverUrl}/generate`, {
                params: {
                    from: 8 * (7 - positionFrom[0]) + positionFrom[1]
                }
            }).then((res) => {
                setMoves(res.data.moves);
            })
        } catch (err) {
            console.error(err);
        }
    }, [positionFrom]);


    useEffect(() => {
        if (chess.isCheckmate()) {
            setGameOver('Checkmate')
            playSound('checkmate')
        }

        if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition()) setGameOver('Draw')
    }, [board, game])


    return (
        <ChessContext.Provider value={{
            board, setBoard, positionFrom, setPositionFrom, positionTo, setPositionTo,
            handleClick, side, setSide, game, setGame, gameOver, rematch, handleDrop, handleDrag, handleRevert, moves
        }}{...props}/>
    )
}


const useChess = () => useContext(ChessContext);

export {ChessProvider, useChess};
