/* eslint-disable react/jsx-one-expression-per-line */
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useKeyPressed } from '../../hooks/keyPressed';
import api from '../../services/api';
import { Players } from '../../types';
import Game from '../Game';
import Score from '../Score';

import { Container, ContainerGame } from './styles';

type RoomArgs = {
  playerId: number;
};

const Room: React.FC<RoomArgs> = args => {
  const [players, setPlayers] = useState<Players | undefined>();

  const { setKeyPressed } = useKeyPressed();

  const registerToSocket = useCallback(() => {
    const socket = io('http://192.168.0.110:3333');

    socket.on('players', (res: Players) => {
      setPlayers(res);
    });
  }, []);

  const getPlayers = useCallback(async () => {
    const result = await api.get('room/players');
    const resultPlayers = result.data as Players;
    setPlayers(resultPlayers);
  }, []);

  useEffect(() => {
    getPlayers();
    registerToSocket();
  }, []);

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLDivElement>) => {
      setKeyPressed(e.key);
    },
    [],
  );

  return (
    <Container>
      <ContainerGame tabIndex={0} onKeyDown={handleKeyDown}>
        <div>
          {!players?.player2 ? (
            <div>Aguardando adversário...</div>
          ) : (
            <Game playerId={args.playerId} />
          )}
        </div>
      </ContainerGame>
      {players && <Score players={players} />}
    </Container>
  );
};

export default Room;
