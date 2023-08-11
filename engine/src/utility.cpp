#include <iostream>
#include "utility.h"

using namespace std;

const int bishop_relevant_bits[64] = {
        6, 5, 5, 5, 5, 5, 5, 6,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 7, 7, 7, 7, 5, 5,
        5, 5, 7, 9, 9, 7, 5, 5,
        5, 5, 7, 9, 9, 7, 5, 5,
        5, 5, 7, 7, 7, 7, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        6, 5, 5, 5, 5, 5, 5, 6
};

// rook relevant occupancy bit count for every square on board
const int rook_relevant_bits[64] = {
        12, 11, 11, 11, 11, 11, 11, 12,
        11, 10, 10, 10, 10, 10, 10, 11,
        11, 10, 10, 10, 10, 10, 10, 11,
        11, 10, 10, 10, 10, 10, 10, 11,
        11, 10, 10, 10, 10, 10, 10, 11,
        11, 10, 10, 10, 10, 10, 10, 11,
        11, 10, 10, 10, 10, 10, 10, 11,
        12, 11, 11, 11, 11, 11, 11, 12
};

void printBoard(uint64_t board) {
    for (int rank = 7; rank >= 0; --rank) {
        for (int file = 0; file < 8; ++file) {
            int square = rank * 8 + file;
            if ((board & (1ULL << square)) != 0) {
                cout << "X ";
            } else {
                cout << "- ";
            }
        }
        cout << '\n';
    }
    cout << '\n';
}

uint64_t setOccupancy(int index, int bits, uint64_t attackMask) {
    uint64_t occupancy = 0;

    for (int i = 0; i < bits; i++) {
        int square = getLSBIndex(attackMask);

        attackMask &= ~(1ULL << square);

        if (index & (1ULL << i)) {
            occupancy |= (1ULL << square);
        }
    }

    return occupancy;
}