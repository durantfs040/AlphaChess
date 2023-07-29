import './App.css';
import ChessBoard from "./containers/ChessBoard.jsx";
import {useChess} from "./hooks/useChess.jsx";

function App() {
    const {side} = useChess()

    return (
        <div>
            <div style={{color: "black"}}>
                {`${side === "w" ? "White" : "Black"} To Move`}
            </div>
            <ChessBoard/>
        </div>
    )
}

export default App
