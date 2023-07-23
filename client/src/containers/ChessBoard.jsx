import Row from "../components/Row.jsx";
import {startingPositions} from "../constants/index.js";
import {useState} from "react";


const ChessBoard = () => {
    const [positions, setPositions] = useState(startingPositions);

    return (
        <div>
            {positions.map((position, index) => {
                return (
                    <Row key={index} rowPositions={position} file={index}/>
                );
            })}
        </div>
    );
};

export default ChessBoard