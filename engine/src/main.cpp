#include <iostream>
#include "Bitboard.h"
#include "Chessboard.h"
#include "utility.h"

using namespace std;


int main() {
    ChessBoard board;

    board.movePiece(10, 26);
    board.movePiece(50, 34);
    board.movePiece(6, 21);
    board.movePiece(59, 41);
    board.movePiece(41, 33);
    board.movePiece(26, 33);

    board.printMailBox();
    for (int i = 0; i < 12; i++) {
        printBoard(board.pieces[i].getBoard());
    }
}
