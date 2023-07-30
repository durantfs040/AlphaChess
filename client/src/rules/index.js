const rules = (from, to, piece, capturedPiece, side) => {
    if (piece[0] !== side) return false

    const isWhite = (piece[0] === 'w');
    const type = piece[1];


    switch (type) {
        case 'p':
            // move two squares forward at start
            if (capturedPiece === '' && from[0] === 1 + 5 * isWhite && to[0] === 3 + isWhite && from[1] === to[1]) return true
            // move one square forward
            if (capturedPiece === '') return (from[0] === to[0] - 1 + 2 * isWhite && from[1] === to[1])
            // capture pieces
            return from[0] === to[0] - 1 + 2 * isWhite && Math.abs(from[1] - to[1]) === 1;
        // todo: en passant
        case 'n':
            console.log(`n`);
            return true
        case 'b':
            console.log(`b`);
            return true
        case 'r':
            console.log(`r`);
            return true
        case 'q':
            console.log(`q`);
            return true
        case 'k':
            console.log(`k`);
            return true
        default:
            return false;
    }
}

export const castle = (from, to) => {
    return [[from[0], (from[1] > to[1]) ? 0 : 7], [from[0], (from[1] + to[1]) / 2]]
}

export default rules