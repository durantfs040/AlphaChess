#pragma once

#include "Bitboard.h"

using namespace std;


class ChessBoard {
public:
    array<int, 64> mailbox;
    array<Bitboard, 12> pieces;
    array<uint64_t, 2> allColorPieces;
    uint64_t allPieces;

    ChessBoard();

    void movePiece(int from, int to);

    void printMailBox();

    void testMoves();

    uint64_t generateMoves(int from);

};
