import { Request, Response } from 'express';
import Room from '../Room';
import { Position } from '../types';
import { numberToPosition } from '../util';

type JoinRequestDto = {
  name: string;
};

class GameController {
  private room: Room;

  async players(request: Request, response: Response): Promise<Response> {
    const players = this.room.getPlayersAndScore();
    return response.status(201).json(players);
  }

  async join(request: Request, response: Response): Promise<Response> {
    if (!this.room) {
      this.room = new Room();
    }

    const data = request.body as JoinRequestDto;

    const player = this.room.addPlayer(data.name);

    request.io.emit('players', this.room.getPlayersAndScore());

    return response.status(201).json({ playerId: player.id });
  }

  async start(request: Request, response: Response): Promise<Response> {
    this.room.startNewGame();
    request.io.emit('started');
    return response.status(201).json({ message: 'Game started!' });
  }

  async play(request: Request, response: Response): Promise<Response> {
    if (!this.room)
      return response.status(401).json({ message: 'The game is not started!' });

    const { playerId } = request.body;

    const value = Number(request.body.value);

    let position: Position = { x: -1, y: -1, index: -1 };

    if (value) position = numberToPosition(value);
    else
      position = {
        x: Number(request.body.x),
        y: Number(request.body.y),
        index: 0,
      };

    const playResponse = this.room.play(playerId, position);

    if (playResponse) request.io.emit('play', playResponse);
    if (playResponse?.winner)
      request.io.emit('players', this.room.getPlayersAndScore());

    return response.json(playResponse);
  }
}

export default new GameController();
