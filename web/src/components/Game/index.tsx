/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { io } from 'socket.io-client';
import { useKeyPressed } from '../../hooks/keyPressed';
import api from '../../services/api';
import { Values, WinSequence } from '../../types';
import ButtonField from '../ButtonField';

import './styles.css';

const Game: React.FC<GameArgs> = args => {
  const [matrix, setMatrix] = useState<Matrix>();
  const [winner, setWinner] = useState<Winner | undefined>();
  const [finished, setFinished] = useState<boolean>(false);
  const [runningGame, setRunningGame] = useState<boolean>(false);

  const { keyPressed } = useKeyPressed();

  const handleNewGame = useCallback(async () => {
    if (
      !runningGame ||
      (runningGame &&
        confirm(
          'Já tem um jogo em andamento, deseja realmente iniciar um novo jogo?',
        ))
    )
      await api.post('room/start');
  }, [runningGame]);

  const newGame = useCallback(async () => {
    setMatrix([[], [], []] as Matrix);
    setFinished(false);
    setRunningGame(true);
    setWinner(undefined);
  }, []);

  const handlePlay = useCallback((value: number) => {
    api.post('room/play', { playerId: args.playerId, value });
  }, []);

  const registerToSocket = useCallback(() => {
    const socket = io('http://192.168.0.110:3333');

    socket.on('play', (res: ResultDto) => {
      setMatrix(res.matrix);

      if (res.finished) {
        setWinner(res.winner);
        setFinished(true);
        setRunningGame(false);
      }
    });

    socket.on('started', () => {
      newGame();
    });
  }, []);

  useEffect(() => {
    registerToSocket();
  }, []);

  useEffect(() => {
    const value = Number(keyPressed);
    if (value >= 1 && value <= 9) handlePlay(value);
  }, [keyPressed]);

  return (
    <>
      {!runningGame && <div>Pronto para iniciar!</div>}
      <button type="button" onClick={handleNewGame} className="new-game">
        Novo jogo
      </button>
      {matrix && (
        <div className="game">
          <div className="line">
            <ButtonField
              value={matrix[0][0]}
              buttonFieldNumber={7}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[0][1]}
              buttonFieldNumber={8}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[0][2]}
              buttonFieldNumber={9}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
          </div>
          <div className="line">
            <ButtonField
              value={matrix[1][0]}
              buttonFieldNumber={4}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[1][1]}
              buttonFieldNumber={5}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[1][2]}
              buttonFieldNumber={6}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
          </div>

          <div className="line">
            <ButtonField
              value={matrix[2][0]}
              buttonFieldNumber={1}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[2][1]}
              buttonFieldNumber={2}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
            <ButtonField
              value={matrix[2][2]}
              buttonFieldNumber={3}
              handlePlay={handlePlay}
              winSequence={winner?.winSequence}
            />
          </div>
        </div>
      )}
      {finished && (
        <div className="result">
          {winner ? `${winner.playerName} Venceu!!!` : 'Empate!'}
        </div>
      )}
    </>
  );
};

export default Game;

type Winner = {
  playerName: string;
  winSequence: WinSequence;
};

type Matrix = Values[][];

type ResultDto = {
  matrix: Matrix;
  finished: boolean;
  winner: Winner | undefined;
};

type GameArgs = {
  playerId: number;
  // key: string | undefined;
};
