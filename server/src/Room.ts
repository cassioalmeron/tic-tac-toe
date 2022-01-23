/* eslint-disable no-plusplus */
import Game, { Matrix, PlayResult, WinSequence } from './Game';
import Player from './Player';
import { Position } from './types';

class Room {
  private players: Player[] = [];

  private currentPlayer: Player;

  private score: number[] = [];

  private game: Game;

  constructor() {
    this.score.push(0);
    this.score.push(0);
  }

  public addPlayer(name: string): Player {
    const nextId = this.players.length + 1;
    const player = new Player(nextId, name);
    this.players.push(player);

    if (!this.currentPlayer) [this.currentPlayer] = this.players;

    return player;
  }

  public startNewGame(): void {
    this.game = new Game();
  }

  public play(player: number, position: Position): PlayResult | undefined {
    if (this.currentPlayer.id !== player) return undefined;

    const result = this.game.play(position);

    if (result.winner) this.score[this.currentPlayer.id - 1]++;

    const res = {
      matrix: result.matrix,
      finished: result.finished,
    } as PlayResult;

    if (result.winner) {
      res.winner = {
        playerName: this.currentPlayer.name,
        winSequence: result.winner?.winSequence,
      };
    }

    const index = this.currentPlayer.id === 1 ? 1 : 0;
    this.currentPlayer = this.players[index];

    return res;
  }

  public getPlayersAndScore(): Score {
    const score: Score = {
      player1: {
        name: this.players[0].name,
        score: this.score[0],
      },
    };

    if (this.players[1])
      score.player2 = {
        name: this.players[1].name,
        score: this.score[1],
      };

    return score;
  }
}

export default Room;

type Score = {
  player1: {
    name: string;
    score: number;
  };
  player2?: {
    name: string;
    score: number;
  };
};

type PlayResult = {
  matrix: Matrix;
  finished: boolean;
  winner: Winner | undefined;
};

type Winner = {
  playerName: string;
  winSequence: WinSequence;
};
