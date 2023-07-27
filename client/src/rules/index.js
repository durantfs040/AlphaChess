const rules = (from, to, piece, capturedPiece) => {
    console.log(`from`, from, `to`, to, `piece`, piece, `capturedPiece`, capturedPiece);
    const color = piece[0];
    const type = piece[1];

    // can't capture own pieces
    if (color === capturedPiece[0]) return false;

    switch (type) {
        case 'p':
            // move two squares forward at start
            if (capturedPiece === '' && from[0] === 1 + 5 * (color === 'w') && to[0] === 3 + (color === 'w')) return true
            // move one square forward
            if (capturedPiece === '' && from[0] === to[0] - 1 + 2 * (color === 'w') && from[1] === to[1]) return true
            // capture pieces
            return from[0] === to[0] - 1 + 2 * (color === 'w') && Math.abs(from[1] - to[1]) === 1;
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
    }
}

export default rules