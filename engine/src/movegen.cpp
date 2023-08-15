#include <iostream>
#include "utility.h"

using namespace std;

constexpr uint64_t MaskRank[8] = {
        0xFFULL,
        0xFFULL << 8,
        0xFFULL << 16,
        0xFFULL << 24,
        0xFFULL << 32,
        0xFFULL << 40,
        0xFFULL << 48,
        0xFFULL << 56,
};

constexpr uint64_t ClearRank[8] = {
        ~(0xFFULL),
        ~(0xFFULL << 8),
        ~(0xFFULL << 16),
        ~(0xFFULL << 24),
        ~(0xFFULL << 32),
        ~(0xFFULL << 40),
        ~(0xFFULL << 48),
        ~(0xFFULL << 56),
};

constexpr uint64_t ClearFile[8] = {
        0xFEFEFEFEFEFEFEFEULL,
        0xFDFDFDFDFDFDFDFDULL,
        0xFBFBFBFBFBFBFBFBULL,
        0xF7F7F7F7F7F7F7F7ULL,
        0xEFEFEFEFEFEFEFEFULL,
        0xDFDFDFDFDFDFDFDFULL,
        0xBFBFBFBFBFBFBFBFULL,
        0x7F7F7F7F7F7F7F7FULL
};

constexpr uint64_t MaskFile[8] = {
        0x0101010101010101ULL,
        0x0202020202020202ULL,
        0x0404040404040404ULL,
        0x0808080808080808ULL,
        0x1010101010101010ULL,
        0x2020202020202020ULL,
        0x4040404040404040ULL,
        0x8080808080808080ULL
};

constexpr uint64_t not_a_file = 18374403900871474942ULL;
constexpr uint64_t not_ab_file = 18229723555195321596ULL;
constexpr uint64_t not_h_file = 9187201950435737471ULL;
constexpr uint64_t not_gh_file = 4557430888798830399ULL;


uint64_t generateWhitePawnMoves(uint64_t fromMask, uint64_t allPieces, uint64_t allBlackPieces) {
    uint64_t validMoves = 0;

    uint64_t pawnStep = (fromMask << 8) & ~allPieces; // one-step

    validMoves |= pawnStep;
    validMoves |= ((pawnStep & MaskRank[2]) << 8) & ~allPieces; // two-step

    uint64_t captures = ((fromMask & not_a_file) << 7) | ((fromMask & not_h_file) << 9); // captures

    validMoves |= (captures & allBlackPieces);
    return validMoves;
}

uint64_t generateBlackPawnMoves(uint64_t fromMask, uint64_t allPieces, uint64_t allWhitePieces) {
    uint64_t validMoves = 0;

    uint64_t pawnStep = (fromMask >> 8) & ~allPieces;

    validMoves |= pawnStep;
    validMoves |= ((pawnStep & MaskRank[5]) >> 8) & ~allPieces;

    uint64_t captures = ((fromMask & not_h_file) >> 7) | ((fromMask & not_a_file) >> 9);
    validMoves |= (captures & allWhitePieces);

    return validMoves;
}

uint64_t generateKnightMoves(uint64_t fromMask) {

    uint64_t square_1 = not_gh_file & (fromMask << 6);
    uint64_t square_2 = not_h_file & (fromMask << 15);
    uint64_t square_3 = not_a_file & (fromMask << 17);
    uint64_t square_4 = not_ab_file & (fromMask << 10);

    uint64_t square_5 = not_ab_file & (fromMask >> 6);
    uint64_t square_6 = not_a_file & (fromMask >> 15);
    uint64_t square_7 = not_h_file & (fromMask >> 17);
    uint64_t square_8 = not_gh_file & (fromMask >> 10);

    uint64_t validMoves = square_1 | square_2 | square_3 | square_4 | square_5 | square_6 | square_7 | square_8;

    return validMoves;
}

uint64_t generateKingMoves(uint64_t fromMask) {

    uint64_t square_1 = not_h_file & (fromMask << 7);
    uint64_t square_2 = fromMask << 8;
    uint64_t square_3 = not_a_file & (fromMask << 9);

    uint64_t square_4 = not_h_file & (fromMask >> 1);
    uint64_t square_5 = not_a_file & (fromMask << 1);

    uint64_t square_6 = not_a_file & (fromMask >> 7);
    uint64_t square_7 = fromMask >> 8;
    uint64_t square_8 = not_h_file & (fromMask >> 9);

    uint64_t validMoves = square_1 | square_2 | square_3 | square_4 | square_5 | square_6 | square_7 | square_8;


    return validMoves;
}

uint64_t generateRookMoves(int from, uint64_t occupied) {
    uint64_t validMoves = 0;

    int x = from % 8;
    int y = from / 8;

    for (int i = y + 1; i < 8; i++) {
        validMoves |= (1ULL << (8 * i + x));
        if (occupied & 1ULL << (8 * i + x)) break;
    }
    for (int i = y - 1; i >= 0; i--) {
        validMoves |= (1ULL << (8 * i + x));
        if (occupied & 1ULL << (8 * i + x)) break;
    }
    for (int i = x + 1; i < 8; i++) {
        validMoves |= (1ULL << (8 * y + i));
        if (occupied & 1ULL << (8 * y + i)) break;
    }
    for (int i = x - 1; i >= 0; i--) {
        validMoves |= (1ULL << (8 * y + i));
        if (occupied & 1ULL << (8 * y + i)) break;
    }


    return validMoves;
}

uint64_t generateBishopMoves(int from, uint64_t occupied) {
    uint64_t validMoves = 0;

    int x = from % 8;
    int y = from / 8;

    for (int i = y + 1, j = x + 1; i <= 7 && j <= 7; i++, j++) {
        validMoves |= (1ULL << (8 * i + j));
        if (occupied & 1ULL << (8 * i + j)) break;
    }
    for (int i = y - 1, j = x + 1; i >= 0 && j <= 7; i--, j++) {
        validMoves |= (1ULL << (8 * i + j));
        if (occupied & 1ULL << (8 * i + j)) break;
    }
    for (int i = y + 1, j = x - 1; i <= 7 && j >= 0; i++, j--) {
        validMoves |= (1ULL << (8 * i + j));
        if (occupied & 1ULL << (8 * i + j)) break;
    }
    for (int i = y - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
        validMoves |= (1ULL << (8 * i + j));
        if (occupied & 1ULL << (8 * i + j)) break;
    }

    return validMoves;
}



