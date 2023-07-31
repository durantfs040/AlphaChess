import './App.css';
import ChessBoard from "./containers/ChessBoard.jsx";
import {useChess} from "./hooks/useChess.jsx";
import StartPage from "./containers/StartPage.jsx";

function App() {
    const {side, player, setPlayer} = useChess()

    if (!player) return <StartPage setPlayer={setPlayer}/>

    return (
        <div>
            <div style={{color: "black"}}>
                {`${side === "w" ? "White" : "Black"} To Move`}
            </div>
            <ChessBoard player={player}/>
        </div>
    )
}

export default App
