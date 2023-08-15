const express = require('express');
const cors = require('cors');

let engine = require('../engine/build/Release/engine');
const app = express();


app.use(express.json());
app.use(cors());

app.get('/reset', (req, res) => {
    engine.resetBoard();
    res.status(204).end();
})

app.post('/move', (req, res) => {
    const {from, to} = req.body;
    const isLegal = engine.makeMove(from, to);
    res.json({isLegal})
})

app.get('/generate', (req, res) => {
    const {from} = req.query;
    const moves = engine.generateMoves(from);
    res.json({moves});
})


app.listen(4000, () => console.log('Server running on port 4000'));
