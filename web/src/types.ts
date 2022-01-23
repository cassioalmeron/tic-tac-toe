export type Player = 'X' | 'O';

export type Values = Player | undefined;

export type WinSequence = {
  position1: Position;
  position2: Position;
  position3: Position;
};

export type Position = {
  x: number;
  y: number;
  index: number;
};

export type Players = {
  player1: {
    name: string;
    score: number;
  };
  player2?: {
    name: string;
    score: number;
  };
};
