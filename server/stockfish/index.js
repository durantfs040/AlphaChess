var Index;
var engine;

const dotenv = require('dotenv');
dotenv.config();

try {
    var INIT_ENGINE = require("./stockfish-nnue-16.js");
    var wasmPath = require("path").join(__dirname, "stockfish-nnue-16.wasm");
    var engine = {
        locateFile: function (path) {
            if (path.indexOf(".wasm") > -1) {
                return wasmPath;
            } else {
                return __filename;
            }
        },
    };

    if (typeof INIT_ENGINE === "function") {
        var Stockfish = INIT_ENGINE();
        Stockfish(engine)
    }
} catch (e) {
    console.error(e)
}


function analyzePosition(position, callback) {
    const depth = process.env.NODE_ENV === 'development' ? 20 : 10;

    function send(str) {
        console.log("Sending: " + str);
        engine.postMessage(str);
    }

    const listener = (line) => {
        if (line.indexOf('bestmove') > -1) {
            callback(line);
            engine.removeMessageListener(listener);
        }
    };

    engine.addMessageListener(listener);

    send("uci");
    send("setoption name Use NNUE value true");
    send(`position fen ${position}`);
    send(`go depth ${depth}`);
}


module.exports = {
    analyzePosition
};
