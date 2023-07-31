import './App.css';
import ChessBoard from "./containers/ChessBoard.jsx";
import {useChess} from "./hooks/useChess.jsx";
import StartPage from "./containers/StartPage.jsx";

function App() {
    const {game, gameOver, rematch} = useChess()

    if (!game) return <StartPage/>

    return (
        <div>
            <div className='head' style={{visibility: gameOver === 'No' ? "hidden" : "visible"}}>
                <h1 className='gameOver'>{gameOver}</h1>
                <button className='rematch' onClick={rematch}>Rematch</button>
            </div>
            <ChessBoard/>
        </div>
    )
}

export default App
