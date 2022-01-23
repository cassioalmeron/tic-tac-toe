/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { Position } from './types';

const position1: Position = { x: 2, y: 0, index: 1 };
const position2: Position = { x: 2, y: 1, index: 2 };
const position3: Position = { x: 2, y: 2, index: 3 };
const position4: Position = { x: 1, y: 0, index: 4 };
const position5: Position = { x: 1, y: 1, index: 5 };
const position6: Position = { x: 1, y: 2, index: 6 };
const position7: Position = { x: 0, y: 0, index: 7 };
const position8: Position = { x: 0, y: 1, index: 8 };
const position9: Position = { x: 0, y: 2, index: 9 };

type Player = 'X' | 'O';
type Values = Player | undefined;

export type Matrix = Values[][];

export type PlayResult = {
  matrix: Matrix;
  finished: boolean;
  winner: Winner | undefined;
};

type Winner = {
  player: Player;
  winSequence: WinSequence;
};

export type WinSequence = {
  position1: Position;
  position2: Position;
  position3: Position;
};

class Game {
  private matrix: Matrix = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  private currentPlayer: Player = 'X';

  private finished = false;

  private winner: Winner | undefined = undefined;

  public play(position: Position): PlayResult {
    if (this.finished || this.positionIsBusy(position))
      return {
        matrix: [...this.matrix],
        finished: this.finished,
        winner: this.winner,
      };

    this.matrix[position.x][position.y] = this.currentPlayer;

    const winner = this.verifyWinner();

    if (this.verifyWinner()) {
      this.finished = true;
      this.winner = winner;
    } else {
      this.finished = this.verifyFinished();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    return {
      matrix: [...this.matrix],
      finished: this.finished,
      winner: this.winner,
    };
  }

  private positionIsBusy(position: Position): boolean {
    return this.matrix[position.x][position.y] !== undefined;
  }

  private verifyFinished(): boolean {
    for (const i in this.matrix) {
      for (const j in this.matrix[i]) {
        if (this.matrix[i][j] === undefined) return false;
      }
    }

    return true;
  }

  private verifyWinner(): Winner | undefined {
    let winSequence = this.verifyWinnerPositions(
      position1,
      position2,
      position3,
    );
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position4, position5, position6);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position7, position8, position9);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position1, position4, position7);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position2, position5, position8);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position3, position6, position9);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position1, position5, position9);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    winSequence = this.verifyWinnerPositions(position7, position5, position3);
    if (winSequence)
      return {
        player: this.currentPlayer,
        winSequence,
      };

    return undefined;
  }

  private verifyWinnerPositions(
    pos1: Position,
    pos2: Position,
    pos3: Position,
  ): WinSequence | undefined {
    if (
      this.matrix[pos1.x][pos1.y] === this.currentPlayer &&
      this.matrix[pos2.x][pos2.y] === this.currentPlayer &&
      this.matrix[pos3.x][pos3.y] === this.currentPlayer
    ) {
      const winSequence: WinSequence = {
        position1: pos1,
        position2: pos2,
        position3: pos3,
      };
      return winSequence;
    }

    return undefined;
  }

  public getMatrix(): Matrix {
    return [...this.matrix];
  }
}

export default Game;
