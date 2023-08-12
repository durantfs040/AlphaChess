const express = require('express');
const cors = require('cors');
const {analyzePosition} = require('./stockfish');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('ok');
})

app.post('/analyze', (req, res) => {
    const position = req.body.position;
    try {
        analyzePosition(position, (results) => {
            res.json({results});
        });
    } catch (err) {
        res.status(404).json({message: 'waits that\'s illegal!'})
    }
});

app.listen(4000, () => console.log('Server running on port 4000'));
