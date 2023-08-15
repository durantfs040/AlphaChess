#pragma once

#include <cstdint>
#include "Bitboard.h"

using namespace std;

uint64_t generateWhitePawnMoves(uint64_t fromMask, uint64_t allPieces, uint64_t allBlackPieces);

uint64_t generateBlackPawnMoves(uint64_t fromMask, uint64_t allPieces, uint64_t allWhitePieces);

uint64_t generateKnightMoves(uint64_t fromMask);

uint64_t generateKingMoves(uint64_t fromMask);

uint64_t generateRookMoves(int from, uint64_t occupied);

uint64_t generateBishopMoves(int from, uint64_t occupied);
