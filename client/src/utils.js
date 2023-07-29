export const boardToFen = (board, side) => {
    let fen = '';
    const pieceMap = {
        'br': 'r',
        'bn': 'n',
        'bb': 'b',
        'bq': 'q',
        'bk': 'k',
        'bp': 'p',
        'wr': 'R',
        'wn': 'N',
        'wb': 'B',
        'wq': 'Q',
        'wk': 'K',
        'wp': 'P'
    };

    for (let i = 0; i < board.length; i++) {
        let rank = board[i];
        let emptySquareCount = 0;

        for (let j = 0; j < rank.length; j++) {
            if (rank[j] === '') {
                emptySquareCount++;
            } else {
                if (emptySquareCount > 0) {
                    fen += emptySquareCount;
                    emptySquareCount = 0;
                }
                fen += pieceMap[rank[j]];
            }
        }

        if (emptySquareCount > 0) {
            fen += emptySquareCount;
        }

        if (i !== board.length - 1) {
            fen += '/';
        }
    }

    fen += ` ${side} KQkq - 0 1`;

    return fen;
}

export const toNumber = (move) => {
    return {
        from: [56 - move.charCodeAt(1), move.charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)],
        to: [56 - move.charCodeAt(3), move.charAt(2).charCodeAt(0) - 'a'.charCodeAt(0)]
    }
}
