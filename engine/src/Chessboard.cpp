#pragma once

#include <iostream>
#include "Bitboard.h"
#include "Chessboard.h"
#include "movegen.h"
#include "utility.h"

using namespace std;

constexpr uint64_t WHITE_PAWN_START_POS = 0xFF00;
constexpr uint64_t WHITE_ROOK_START_POS = 0x81;
constexpr uint64_t WHITE_KNIGHT_START_POS = 0x42;
constexpr uint64_t WHITE_BISHOP_START_POS = 0x24;
constexpr uint64_t WHITE_KING_START_POS = 0x08;
constexpr uint64_t WHITE_QUEEN_START_POS = 0x10;

constexpr uint64_t BLACK_PAWN_START_POS = 0xFFULL << 48;
constexpr uint64_t BLACK_ROOK_START_POS = 0x81ULL << 56;
constexpr uint64_t BLACK_KNIGHT_START_POS = 0x42ULL << 56;
constexpr uint64_t BLACK_BISHOP_START_POS = 0x24ULL << 56;
constexpr uint64_t BLACK_KING_START_POS = 0x08ULL << 56;
constexpr uint64_t BLACK_QUEEN_START_POS = 0x10ULL << 56;

constexpr uint64_t WHITE_START_POS = 0xFFFF;
constexpr uint64_t Black_START_POS = 0xFFFFULL << 48;

constexpr uint64_t START_POS = 0xFFFF | (0xFFFFULL << 48);

char mailboxChar[14] = "PRNBQKprnbqk";


ChessBoard::ChessBoard() : pieces{
        Bitboard(WHITE_PAWN_START_POS, White, Pawn),
        Bitboard(WHITE_ROOK_START_POS, White, Rook),
        Bitboard(WHITE_KNIGHT_START_POS, White, Knight),
        Bitboard(WHITE_BISHOP_START_POS, White, Bishop),
        Bitboard(WHITE_KING_START_POS, White, King),
        Bitboard(WHITE_QUEEN_START_POS, White, Queen),
        Bitboard(BLACK_PAWN_START_POS, Black, Pawn),
        Bitboard(BLACK_ROOK_START_POS, Black, Rook),
        Bitboard(BLACK_KNIGHT_START_POS, Black, Knight),
        Bitboard(BLACK_BISHOP_START_POS, Black, Bishop),
        Bitboard(BLACK_KING_START_POS, Black, King),
        Bitboard(BLACK_QUEEN_START_POS, Black, Queen)
}, mailbox{
        1, 2, 3, 4, 5, 3, 2, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1,
        6, 6, 6, 6, 6, 6, 6, 6,
        7, 8, 9, 10, 11, 9, 8, 7,
}, allColorPieces{WHITE_START_POS, Black_START_POS}, allPieces(START_POS) {}


void ChessBoard::movePiece(int from, int to) {
    int piece = mailbox[from];
    int capturedPiece = mailbox[to];


    int color = piece / 6;
    int type = piece % 6;


    uint64_t board = pieces[piece].getBoard();
    uint64_t capturedBoard = pieces[capturedPiece].getBoard();

    uint64_t fromMask = 1ULL << from;
    uint64_t toMask = 1ULL << to;
    uint64_t fromToMask = fromMask | toMask;

    bool capture = toMask & allColorPieces[!color];

    if (!(board & fromMask)) {
        cout << "no piece on square" << '\n';
        return;
    }

    if (!(moveGeneration(type, color, from, allColorPieces[White], allColorPieces[Black], allPieces) & toMask)) {
        cout << "invalid move" << '\n';
        return;
    }

    board ^= fromToMask;
    allColorPieces[color] ^= fromToMask;

    if (capture) {
        allPieces ^= fromMask;
        allColorPieces[!color] ^= toMask;
        capturedBoard ^= toMask;
    } else {
        allPieces ^= fromToMask;
    }

    mailbox[to] = mailbox[from];
    mailbox[from] = -1;

    pieces[piece].setBoard(board);
    pieces[capturedPiece].setBoard(capturedBoard);
}

void ChessBoard::printMailBox() {
    for (int i = 7; i >= 0; i--) {
        for (int j = 0; j < 8; j++) {
            if (mailbox[8 * i + j] != -1) {
                cout << mailboxChar[mailbox[8 * i + j]] << ' ';
            } else cout << "  ";
        }
        cout << '\n';
    }
    cout << '\n';
}

void ChessBoard::testMoves() {
    for (int i = 0; i < 64; i++) {
        cout << "moves for " << i << '\n';
        moveGeneration(Rook, White, i, allColorPieces[White], allColorPieces[Black], allPieces);
        printMailBox();
    }
}


