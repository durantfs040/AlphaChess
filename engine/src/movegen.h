#pragma once

#include <cstdint>
#include "Bitboard.h"

using namespace std;

uint64_t moveGeneration(int type, int color, int from, uint64_t whitePieces, uint64_t blackPieces, uint64_t allPieces);

