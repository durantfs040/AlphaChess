#pragma once

#include <cstdint>

enum Type {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King
};

enum Color {
    White,
    Black
};

enum {
    a8, b8, c8, d8, e8, f8, g8, h8,
    a7, b7, c7, d7, e7, f7, g7, h7,
    a6, b6, c6, d6, e6, f6, g6, h6,
    a5, b5, c5, d5, e5, f5, g5, h5,
    a4, b4, c4, d4, e4, f4, g4, h4,
    a3, b3, c3, d3, e3, f3, g3, h3,
    a2, b2, c2, d2, e2, f2, g2, h2,
    a1, b1, c1, d1, e1, f1, g1, h1
};

class Bitboard {
public:
    explicit Bitboard(uint64_t board, Color c, Type t) : bitboard(board), color(c), type(t) {}

    [[nodiscard]] inline uint64_t getBoard() const { return bitboard; }

    inline void setBoard(uint64_t board) { bitboard = board; }

private:
    uint64_t bitboard;
    Color color;
    Type type;
};