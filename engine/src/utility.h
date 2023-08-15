#pragma once

#include <cstdint>

void printBoard(uint64_t board);

inline int bitCount(uint64_t board) {
    return __builtin_popcountll(board);
}

inline int getLSBIndex(uint64_t board) {
    return __builtin_ctzll(board);
}
