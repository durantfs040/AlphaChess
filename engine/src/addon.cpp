#include <node.h>
#include <iostream>
#include "Bitboard.h"
#include "Chessboard.h"
#include "utility.h"

using namespace std;
using namespace v8;

ChessBoard board;

void ResetBoard(const FunctionCallbackInfo<Value>& arg) {
    board = ChessBoard();
}

void MakeMove(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();


    int from = args[0].As<Number>()->Value();
    int to = args[1].As<Number>()->Value();

    cout << "From: " << from << " To: " << to << endl;

    board.movePiece(from, to);

    board.printMailBox();

}

void GenerateMoves(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    vector<int> moves;
    int from = args[0]->NumberValue(isolate->GetCurrentContext()).FromJust();

    uint64_t attackMask = board.generateMoves(from);


    while (attackMask) {
        int index = getLSBIndex(attackMask);  // Get the index of the least significant set bit.
        moves.push_back(index);
        attackMask &= attackMask - 1;  // Clear the least significant set bit.
    }


    Local<Array> result = Array::New(isolate, moves.size());

    for (int i = 0; i < moves.size(); i++) {
        result->Set(isolate->GetCurrentContext(), i, Integer::New(isolate, moves[i]));
    }

    args.GetReturnValue().Set(result);
}


void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "resetBoard", ResetBoard);
    NODE_SET_METHOD(exports, "makeMove", MakeMove);
    NODE_SET_METHOD(exports, "generateMoves", GenerateMoves);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init);


