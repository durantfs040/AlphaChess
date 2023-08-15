#include <iostream>
#include "Bitboard.h"
#include "Chessboard.h"
#include "utility.h"

using namespace std;


int main() {
    ChessBoard board;

    board.movePiece(54, 46);
    board.movePiece(61, 47);
    board.printMailBox();
}
