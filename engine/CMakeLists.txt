cmake_minimum_required(VERSION 3.25)
project(engine)

set(CMAKE_CXX_STANDARD 17)

add_executable(engine src/main.cpp src/test.cpp src/Bitboard.h src/Chessboard.h src/Chessboard.cpp src/movegen.h src/movegen.cpp src/utility.h src/utility.cpp)
